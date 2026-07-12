/**
 * Audio Module
 * Plays ayah recitations with word-timed highlighting.
 *
 * Primary source: quran.com v4 recitations API, which returns per-ayah audio
 * URLs plus word segment timings:
 *   GET {apiBase}/recitations/{id}/by_ayah/{key}?fields=segments
 *   → audio_files[0] = { verse_key, url, segments: [[idx0, pos1based, startMs, endMs], ...] }
 * Verified empirically:
 *   - `?fields=segments` is required; segments are omitted otherwise.
 *   - `url` may be relative ("Alafasy/mp3/001002.mp3" → https://verses.quran.com/...)
 *     or protocol-relative ("//mirrors.quranicaudio.com/...").
 *   - Some recitations (e.g. Sudais, id 3) return segment values as STRINGS —
 *     every value must be coerced with Number().
 *
 * Fallback: the islamic.network CDN (no segments → no highlighting), used when
 * the quran.com fetch or playback fails, so audio keeps working offline-ish.
 */

class AudioPlayer {
  constructor() {
    this.container = document.getElementById('audio-container');
    if (!this.container) return;

    // Reciter select values → quran.com v4 recitation ids
    // (verified against /resources/recitations):
    //   7 Mishari Rashid al-`Afasy · 3 Abdur-Rahman as-Sudais
    //   9 Mohamed Siddiq al-Minshawi (Murattal) · 6 Mahmoud Khalil Al-Husary
    this.recitationIds = {
      mishary: 7,
      sudais: 3,
      minshawi: 9,
      husary: 6
    };

    // Reciter select values → islamic.network edition identifiers (fallback)
    this.reciterEditions = {
      mishary: 'ar.alafasy',
      sudais: 'ar.abdurrahmaansudais',
      minshawi: 'ar.minshawi',
      husary: 'ar.husary'
    };

    // Relative audio URLs from the API resolve against this host
    this.versesBase = 'https://verses.quran.com/';

    // Cache of segment fetches: "recitationId:verseKey" → Promise<{url, segments}>
    this.segmentCache = new Map();

    this.ayahs = [];
    this.currentIndex = -1;
    this.currentSegments = null;  // [{pos, start, end}] for the playing ayah, or null
    this.highlightedPos = null;
    this.playToken = 0;           // guards against stale async fetches
    this.usingFallback = false;

    this.audio = new Audio();
    this.audio.addEventListener('ended', () => { this.playNext(); this.updateUI(); });
    this.audio.addEventListener('play', () => this.updateUI());
    this.audio.addEventListener('pause', () => {
      this.clearHighlight();
      this.updateUI();
    });
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('error', () => this.onAudioError());

    // Cumulative ayah offsets for global ayah numbers (1..6236)
    this.surahOffsets = {};
    let offset = 0;
    SURAH_DATA.forEach(s => {
      this.surahOffsets[s.number] = offset;
      offset += s.ayahCount;
    });

    window.addEventListener('ayahsLoaded', (e) => {
      this.ayahs = e.detail.ayahs;
      this.currentIndex = -1;
      this.stop();
      this.renderList();
    });

    // Reading-tab per-ayah play buttons — click again to pause/resume
    window.addEventListener('playAyah', (e) => {
      const idx = this.ayahs.findIndex(a => a.key === e.detail.ref);
      if (idx < 0) return;
      if (idx === this.currentIndex && this.audio.src) {
        if (this.audio.paused) this.audio.play().catch(() => {});
        else this.audio.pause();
        return;
      }
      this.playIndex(idx);
    });

    this.setupControls();
  }

  reciterKey() {
    const select = document.getElementById('reciter-select');
    return select?.value || 'mishary';
  }

  recitationId() {
    return this.recitationIds[this.reciterKey()] || this.recitationIds.mishary;
  }

  edition() {
    return this.reciterEditions[this.reciterKey()] || 'ar.alafasy';
  }

  /** islamic.network fallback URL (no word segments available) */
  fallbackUrl(ayah) {
    const globalNumber = this.surahOffsets[ayah.surah] + ayah.ayah;
    return `https://cdn.islamic.network/quran/audio/128/${this.edition()}/${globalNumber}.mp3`;
  }

  /** Resolve possibly-relative audio URLs from the quran.com API */
  resolveAudioUrl(url) {
    if (/^https?:\/\//i.test(url)) return url;
    if (url.startsWith('//')) return 'https:' + url;
    return this.versesBase + url.replace(/^\//, '');
  }

  /**
   * Normalize raw API segments [[idx, pos, startMs, endMs], ...] into
   * [{pos, start, end}]. Values may arrive as strings → Number() everything.
   */
  normalizeSegments(segments) {
    if (!Array.isArray(segments)) return null;
    const out = segments
      .map(s => ({ pos: Number(s[1]), start: Number(s[2]), end: Number(s[3]) }))
      .filter(s => Number.isFinite(s.pos) && Number.isFinite(s.start) && Number.isFinite(s.end));
    return out.length ? out : null;
  }

  /**
   * Fetch (and cache) the audio URL + word segments for one ayah from
   * quran.com. Cached per reciter+ayah; failed fetches are evicted so a
   * later attempt can retry.
   */
  fetchAyahAudio(ayah) {
    const rid = this.recitationId();
    const cacheKey = `${rid}:${ayah.key}`;
    if (!this.segmentCache.has(cacheKey)) {
      const promise = fetch(`${QuranData.apiBase}/recitations/${rid}/by_ayah/${ayah.key}?fields=segments`)
        .then(r => {
          if (!r.ok) throw new Error(`Audio API request failed (${r.status})`);
          return r.json();
        })
        .then(data => {
          const file = (data.audio_files || [])[0];
          if (!file || !file.url) throw new Error('No audio file in response');
          return {
            url: this.resolveAudioUrl(file.url),
            segments: this.normalizeSegments(file.segments)
          };
        })
        .catch(err => {
          this.segmentCache.delete(cacheKey);
          throw err;
        });
      this.segmentCache.set(cacheKey, promise);
    }
    return this.segmentCache.get(cacheKey);
  }

  setupControls() {
    document.getElementById('audio-play')?.addEventListener('click', () => {
      if (!this.audio.paused) {
        this.audio.pause();
      } else if (this.currentIndex >= 0 && this.audio.src) {
        this.audio.play().catch(() => {});
      } else if (this.ayahs.length > 0) {
        this.playIndex(Math.max(this.currentIndex, 0));
      }
    });
    document.getElementById('audio-prev')?.addEventListener('click', () => {
      if (this.currentIndex > 0) this.playIndex(this.currentIndex - 1);
    });
    document.getElementById('audio-next')?.addEventListener('click', () => this.playNext());
    document.getElementById('reciter-select')?.addEventListener('change', () => {
      if (this.currentIndex >= 0 && !this.audio.paused) this.playIndex(this.currentIndex);
    });
  }

  async playIndex(index) {
    if (index < 0 || index >= this.ayahs.length) return;
    const token = ++this.playToken;
    this.currentIndex = index;
    this.usingFallback = false;
    this.currentSegments = null;
    this.clearHighlight();

    const ayah = this.ayahs[index];
    this.renderNowPlaying(ayah);
    let src;
    let segments = null;
    try {
      const res = await this.fetchAyahAudio(ayah);
      src = res.url;
      segments = res.segments;
    } catch (err) {
      // quran.com unavailable → islamic.network, no word highlighting
      src = this.fallbackUrl(ayah);
      this.usingFallback = true;
    }

    // A newer play request superseded this one while we were fetching
    if (token !== this.playToken) return;

    this.currentSegments = segments;
    this.audio.src = src;
    this.audio.play().catch(err => console.error('Audio playback failed:', err));
    this.updateUI();
  }

  playNext() {
    if (this.currentIndex < this.ayahs.length - 1) {
      this.playIndex(this.currentIndex + 1);
    } else {
      this.stop();
    }
  }

  stop() {
    this.playToken++;
    this.audio.pause();
    this.audio.removeAttribute('src');
    this.currentSegments = null;
    this.clearHighlight();
    this.renderNowPlaying(null);
    this.updateUI();
  }

  /** Playback error on the quran.com file → retry once via islamic.network */
  onAudioError() {
    const ayah = this.ayahs[this.currentIndex];
    if (!ayah || this.usingFallback || !this.audio.src) return;
    this.usingFallback = true;
    this.currentSegments = null;
    this.clearHighlight();
    this.audio.src = this.fallbackUrl(ayah);
    this.audio.play().catch(() => {});
  }

  /** Drive the word highlight from the audio clock. */
  onTimeUpdate() {
    if (!this.currentSegments || this.audio.paused) return;
    const ms = this.audio.currentTime * 1000;
    const seg = this.currentSegments.find(s => ms >= s.start && ms < s.end);
    const pos = seg ? seg.pos : null;
    if (pos === this.highlightedPos) return;
    this.highlightedPos = pos;

    // Mirror the highlight onto the Audio-tab word-by-word panel
    const np = document.getElementById('audio-nowplaying');
    if (np) np.querySelectorAll('.ap-word').forEach(s => {
      const on = pos != null && String(s.getAttribute('data-ap-pos')) === String(pos);
      s.classList.toggle('bg-amber-200', on);
      s.classList.toggle('dark:bg-amber-500/40', on);
    });

    if (typeof wordHighlight === 'undefined' || !wordHighlight) return;
    const key = this.ayahs[this.currentIndex]?.key;
    if (pos != null && key) {
      wordHighlight.highlight(key, pos);
    } else {
      wordHighlight.clear();
    }
  }

  clearHighlight() {
    this.highlightedPos = null;
    if (typeof wordHighlight !== 'undefined' && wordHighlight) wordHighlight.clear();
    const np = document.getElementById('audio-nowplaying');
    if (np) np.querySelectorAll('.ap-word').forEach(s => s.classList.remove('bg-amber-200', 'dark:bg-amber-500/40'));
  }

  /** Word-by-word panel for the currently playing ayah (mirrors reading view). */
  renderNowPlaying(ayah) {
    let el = document.getElementById('audio-nowplaying');
    if (!el) {
      el = document.createElement('div');
      el.id = 'audio-nowplaying';
      el.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4';
      this.container.insertBefore(el, this.container.firstChild);
    }
    if (!ayah) { el.innerHTML = ''; el.classList.add('hidden'); return; }
    el.classList.remove('hidden');
    const words = (ayah.words || []).map(w => `
      <span class="ap-word inline-flex flex-col items-center px-1.5 py-1 rounded-lg transition-colors" data-ap-pos="${w.position}">
        <span class="ayah-arabic !text-2xl sm:!text-3xl">${w.arabic}</span>
        <span class="text-[11px] text-gray-500 dark:text-gray-400" dir="auto">${w.meaning || ''}</span>
      </span>`).join('');
    el.innerHTML = `
      <div class="text-xs text-gray-400 mb-2 text-center">${ayah.surahName || ''} ${ayah.key}</div>
      <div class="ayah-arabic !text-3xl !leading-loose text-center mb-3" dir="rtl">${ayah.arabic || ''}</div>
      <div class="flex flex-wrap justify-center gap-x-1 gap-y-1" dir="rtl">${words}</div>`;
  }

  renderList() {
    let list = document.getElementById('audio-ayah-list');
    if (!list) {
      list = document.createElement('div');
      list.id = 'audio-ayah-list';
      list.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-1';
      this.container.appendChild(list);
    }

    if (this.ayahs.length === 0) {
      list.innerHTML = '';
      return;
    }

    list.innerHTML = this.ayahs.map((ayah, i) => `
      <button class="audio-ayah-row w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                     hover:bg-gray-100 dark:hover:bg-gray-700" data-index="${i}">
        <span class="ayah-number">${ayah.ayah}</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">${ayah.surahName} ${ayah.key}</span>
        <span class="ayah-arabic !text-lg truncate flex-1 text-right" dir="rtl">${ayah.arabic}</span>
      </button>
    `).join('');

    list.querySelectorAll('.audio-ayah-row').forEach(row => {
      row.addEventListener('click', () => this.playIndex(parseInt(row.getAttribute('data-index'))));
    });
  }

  updateUI() {
    // Highlight the playing row
    document.querySelectorAll('.audio-ayah-row').forEach((row, i) => {
      const active = i === this.currentIndex && !this.audio.paused;
      row.classList.toggle('bg-blue-50', active);
      row.classList.toggle('dark:bg-blue-900/30', active);
    });

    // Toggle play/pause icon
    const playBtn = document.getElementById('audio-play');
    if (playBtn) {
      const playing = !this.audio.paused;
      playBtn.innerHTML = playing
        ? `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`
        : `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/></svg>`;
    }

    // Reading-tab per-ayah play buttons: swap play/pause icon on the active ayah
    const PLAY_D = 'M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z';
    const PAUSE_D = 'M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z';
    const curKey = this.ayahs[this.currentIndex]?.key;
    document.querySelectorAll('.play-ayah').forEach(btn => {
      const playing = curKey && btn.getAttribute('data-ref') === curKey && !this.audio.paused;
      const path = btn.querySelector('svg path');
      if (path) path.setAttribute('d', playing ? PAUSE_D : PLAY_D);
      btn.classList.toggle('text-primary', !!playing);
      btn.classList.toggle('dark:text-blue-400', !!playing);
    });
  }
}

// Initialize when DOM is ready
let audioPlayer;
document.addEventListener('DOMContentLoaded', () => {
  audioPlayer = new AudioPlayer();
});
