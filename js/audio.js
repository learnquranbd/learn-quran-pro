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

    // Memorization controls
    this.repeatEach = 1;      // replay each ayah N times before advancing (0 = ∞)
    this.loopRange = false;   // loop back to the first ayah at the end of the range
    this.speed = 1;           // playback rate
    this._repeatLeft = 0;

    // Hifz session tools (A/B ayah range, range passes, sleep timer)
    this.rangeStart = 0;      // index of the first ayah of the A/B loop range
    this.rangeEnd = -1;       // index of the last ayah (-1 → end of the list)
    this.rangePasses = 1;     // play the whole range M times before stopping (0 = ∞)
    this._passesLeft = 1;
    this.sleepMinutes = 0;    // auto-pause after N minutes (0 = off, not persisted)
    this._sleepTimer = null;
    this._sleepEndsAt = null; // epoch ms when the sleep timer fires, for the badge
    this.hifzKey = 'audioHifzSettings'; // localStorage: {repeatEach, loopRange, speed, rangePasses}
    const hifz = this.readHifzSettings();
    if (hifz) {
      if (Number.isFinite(hifz.repeatEach) && hifz.repeatEach >= 0) this.repeatEach = hifz.repeatEach;
      if (typeof hifz.loopRange === 'boolean') this.loopRange = hifz.loopRange;
      if (Number.isFinite(hifz.speed) && hifz.speed > 0) this.speed = hifz.speed;
      if (Number.isFinite(hifz.rangePasses) && hifz.rangePasses >= 0) this.rangePasses = hifz.rangePasses;
      this._passesLeft = Math.max(1, this.rangePasses);
    }

    // Seek bar / position persistence state
    this._seeking = false;        // user is dragging the scrubber → don't fight timeupdate
    this._lastProgressAt = 0;     // throttle progress repaints to ~4Hz
    this._resumeTime = null;      // pending resume position, applied on loadedmetadata
    this.posKey = 'audioLastPos'; // localStorage key: {src, time}

    this.audio = new Audio();
    this.audio.addEventListener('ended', () => this.onEnded());
    this.audio.addEventListener('play', () => { this.updateUI(); this.broadcastState(); });
    this.audio.addEventListener('pause', () => {
      this.savePosition();
      this.clearHighlight();
      this.updateUI();
      this.broadcastState();
    });
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
    this.audio.addEventListener('seeked', () => this.updateProgress(true));
    this.audio.addEventListener('error', () => this.onAudioError());

    // Persist the position when the user leaves the tab / closes the page
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.savePosition();
    });
    window.addEventListener('pagehide', () => this.savePosition());

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

    // Keep injected hifz-control labels readable after a language switch:
    // applyTranslations() writes the raw key for entries missing from
    // translations.js, so restore the English fallback in that case.
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') this.refreshHifzLabels();
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

  // ---- Public API for reading-mode tabs (Word-by-Word, Tajweed) -----------

  /** Is an ayah currently playing (not merely loaded/paused)? */
  isPlaying() { return !!(this.audio && this.audio.src && !this.audio.paused); }

  /** Verse key ("s:a") of the ayah currently loaded in the player, or null. */
  currentKey() {
    const a = this.ayahs && this.ayahs[this.currentIndex];
    return a ? a.key : null;
  }

  /**
   * Toggle sequential playback of ALL loaded ayahs (used by the "play all"
   * button on reading-mode tabs). Resumes if paused mid-track, starts from the
   * top otherwise. Auto-advance through the surah is handled by onEnded().
   */
  togglePlayAll() {
    if (this.isPlaying()) { this.audio.pause(); return; }
    if (this.currentIndex >= 0 && this.audio.src) { this.audio.play().catch(() => {}); return; }
    this.playIndex(this.rangeStartIndex());
  }

  /** Notify reading-mode tabs so their play/pause buttons can reflect state. */
  broadcastState() {
    window.dispatchEvent(new CustomEvent('audioStateChanged', {
      detail: { playing: this.isPlaying(), key: this.currentKey() }
    }));
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
        this.playIndex(this.currentIndex >= 0 ? this.currentIndex : this.rangeStartIndex());
      }
    });
    document.getElementById('audio-prev')?.addEventListener('click', () => {
      if (this.currentIndex > 0) this.playIndex(this.currentIndex - 1);
    });
    document.getElementById('audio-next')?.addEventListener('click', () => this.playNext());
    document.getElementById('reciter-select')?.addEventListener('change', () => {
      if (this.currentIndex >= 0 && !this.audio.paused) this.playIndex(this.currentIndex);
    });

    // Repeat-each select: add an ∞ preset (value 0) and restore the saved value.
    const repSel = document.getElementById('audio-repeat');
    if (repSel) {
      if (!repSel.querySelector('option[value="0"]')) {
        const inf = document.createElement('option');
        inf.value = '0';
        inf.textContent = '∞';
        repSel.appendChild(inf);
      }
      repSel.value = String(this.repeatEach);
      if (repSel.value !== String(this.repeatEach)) { this.repeatEach = 1; repSel.value = '1'; }
      repSel.addEventListener('change', (e) => {
        const v = parseInt(e.target.value, 10);
        this.repeatEach = (Number.isFinite(v) && v >= 0) ? v : 1;   // 0 = ∞, so no `|| 1`
        this._repeatLeft = Math.max(this._repeatLeft, 1);   // apply from the next ayah
        this.saveHifzSettings();
      });
    }

    const loopBox = document.getElementById('audio-loop');
    if (loopBox) {
      loopBox.checked = this.loopRange;
      loopBox.addEventListener('change', (e) => {
        this.loopRange = e.target.checked;
        this.saveHifzSettings();
      });
    }

    const spdSel = document.getElementById('audio-speed');
    if (spdSel) {
      spdSel.value = String(this.speed);
      if (spdSel.value !== String(this.speed)) { this.speed = 1; spdSel.value = '1'; }
      spdSel.addEventListener('change', (e) => {
        this.speed = parseFloat(e.target.value) || 1;
        this.audio.playbackRate = this.speed;               // apply live
        this.saveHifzSettings();
      });
    }

    this.renderHifzControls();
  }

  // ---- Hifz enrichments: A/B range, range passes, sleep timer, persistence --

  /** i18n with an English fallback while the key is missing from translations.js */
  tr(key, fallback) {
    const lang = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    const s = (typeof t === 'function') ? t(key, lang) : null;
    return (s && s !== key) ? s : fallback;
  }

  readHifzSettings() {
    try { return JSON.parse(localStorage.getItem(this.hifzKey) || 'null'); } catch (e) { return null; }
  }

  saveHifzSettings() {
    const data = {
      repeatEach: this.repeatEach,
      loopRange: this.loopRange,
      speed: this.speed,
      rangePasses: this.rangePasses
    };
    try { localStorage.setItem(this.hifzKey, JSON.stringify(data)); } catch (e) { /* storage full/blocked */ }
  }

  /** First index of the A/B range, clamped to the loaded list. */
  rangeStartIndex() {
    if (!this.ayahs.length) return 0;
    return Math.min(Math.max(this.rangeStart, 0), this.ayahs.length - 1);
  }

  /** Last index of the A/B range (-1 stored → end of the list). */
  rangeEndIndex() {
    const last = this.ayahs.length - 1;
    if (this.rangeEnd < 0) return last;
    return Math.min(Math.max(this.rangeEnd, this.rangeStartIndex()), last);
  }

  /** Second controls row (range A/B, range passes, sleep timer) inside #audio-player. */
  renderHifzControls() {
    const player = document.getElementById('audio-player');
    if (!player || document.getElementById('audio-hifz')) return;
    const selCls = 'px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700';
    const row = document.createElement('div');
    row.id = 'audio-hifz';
    row.className = 'flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-sm';
    const min = this.tr('audio_min_short', 'min');
    row.innerHTML = `
      <label class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        🎯 <span data-lang-key="audio_range_label">${this.tr('audio_range_label', 'Range')}</span>
        <select id="audio-range-start" class="${selCls}"></select>
        <span data-lang-key="audio_range_to">${this.tr('audio_range_to', 'to')}</span>
        <select id="audio-range-end" class="${selCls}"></select>
      </label>
      <label class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        🔂 <span data-lang-key="audio_range_repeat">${this.tr('audio_range_repeat', 'Repeat range')}</span>
        <select id="audio-range-passes" class="${selCls}">
          <option value="1">1×</option><option value="2">2×</option><option value="3">3×</option>
          <option value="5">5×</option><option value="10">10×</option><option value="0">∞</option>
        </select>
      </label>
      <label class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        ⏰ <span data-lang-key="audio_sleep_timer">${this.tr('audio_sleep_timer', 'Sleep timer')}</span>
        <select id="audio-sleep" class="${selCls}">
          <option value="0" data-lang-key="audio_sleep_off">${this.tr('audio_sleep_off', 'Off')}</option>
          <option value="5">5 ${min}</option><option value="10">10 ${min}</option>
          <option value="15">15 ${min}</option><option value="30">30 ${min}</option>
          <option value="60">60 ${min}</option>
        </select>
        <span id="audio-sleep-left" class="hidden text-xs font-medium text-primary dark:text-blue-400 tabular-nums"></span>
      </label>`;
    player.appendChild(row);

    const startSel = document.getElementById('audio-range-start');
    const endSel = document.getElementById('audio-range-end');
    startSel?.addEventListener('change', () => {
      this.rangeStart = parseInt(startSel.value, 10) || 0;
      if (this.rangeEnd >= 0 && this.rangeEnd < this.rangeStart) {   // keep start ≤ end
        this.rangeEnd = this.rangeStart;
        if (endSel) endSel.value = String(this.rangeEnd);
      }
      this._passesLeft = Math.max(1, this.rangePasses);
    });
    endSel?.addEventListener('change', () => {
      this.rangeEnd = parseInt(endSel.value, 10);
      if (!Number.isFinite(this.rangeEnd)) this.rangeEnd = -1;
      if (this.rangeEnd >= 0 && this.rangeEnd < this.rangeStart) {
        this.rangeStart = this.rangeEnd;
        if (startSel) startSel.value = String(this.rangeStart);
      }
      this._passesLeft = Math.max(1, this.rangePasses);
    });

    const passSel = document.getElementById('audio-range-passes');
    if (passSel) {
      passSel.value = String(this.rangePasses);
      if (passSel.value !== String(this.rangePasses)) { this.rangePasses = 1; passSel.value = '1'; }
      passSel.addEventListener('change', (e) => {
        const v = parseInt(e.target.value, 10);
        this.rangePasses = (Number.isFinite(v) && v >= 0) ? v : 1;  // 0 = ∞
        this._passesLeft = Math.max(1, this.rangePasses);
        this.saveHifzSettings();
      });
    }

    document.getElementById('audio-sleep')?.addEventListener('change', (e) => {
      this.setSleepTimer(parseInt(e.target.value, 10) || 0);
    });

    this.populateRangeSelects();
  }

  /** Fill the A/B selects with the loaded ayahs and reset to the full range. */
  populateRangeSelects() {
    const startSel = document.getElementById('audio-range-start');
    const endSel = document.getElementById('audio-range-end');
    if (!startSel || !endSel) return;
    const opts = this.ayahs.map((a, i) => `<option value="${i}">${a.key}</option>`).join('');
    startSel.innerHTML = opts;
    endSel.innerHTML = opts;
    this.rangeStart = 0;
    this.rangeEnd = this.ayahs.length ? this.ayahs.length - 1 : -1;
    this._passesLeft = Math.max(1, this.rangePasses);
    startSel.value = '0';
    endSel.value = String(this.rangeEnd);
  }

  /** Start (mins > 0) or cancel (mins = 0) the auto-pause sleep timer. */
  setSleepTimer(mins) {
    if (this._sleepTimer) { clearTimeout(this._sleepTimer); this._sleepTimer = null; }
    this.sleepMinutes = mins;
    this._sleepEndsAt = mins > 0 ? Date.now() + mins * 60000 : null;
    if (mins > 0) {
      this._sleepTimer = setTimeout(() => {
        this._sleepTimer = null;
        this._sleepEndsAt = null;
        this.sleepMinutes = 0;
        const sel = document.getElementById('audio-sleep');
        if (sel) sel.value = '0';
        // Pause (not stop) so the saved position lets the user resume here
        if (!this.audio.paused) this.audio.pause();
        this.updateSleepBadge();
      }, mins * 60000);
    }
    this.updateSleepBadge();
  }

  /** Countdown badge next to the sleep-timer select. */
  updateSleepBadge() {
    const el = document.getElementById('audio-sleep-left');
    if (!el) return;
    if (!this._sleepEndsAt) {
      el.classList.add('hidden');
      el.textContent = '';
      return;
    }
    el.textContent = this.fmtTime(Math.max(0, this._sleepEndsAt - Date.now()) / 1000);
    el.classList.remove('hidden');
  }

  /** Restore English fallbacks after applyTranslations() wrote raw missing keys. */
  refreshHifzLabels() {
    const row = document.getElementById('audio-hifz');
    if (!row) return;
    const fallbacks = {
      audio_range_label: 'Range',
      audio_range_to: 'to',
      audio_range_repeat: 'Repeat range',
      audio_sleep_timer: 'Sleep timer',
      audio_sleep_off: 'Off'
    };
    row.querySelectorAll('[data-lang-key]').forEach(el => {
      const key = el.getAttribute('data-lang-key');
      if (el.textContent === key && fallbacks[key]) el.textContent = fallbacks[key];
    });
  }

  onEnded() {
    // Track finished → the saved position is no longer useful
    this.clearSavedPosition();
    // Repeat the same ayah N times (∞ when repeatEach is 0) before moving on
    if (this.repeatEach === 0 || this._repeatLeft > 1) {
      if (this.repeatEach !== 0) this._repeatLeft--;
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});
      this.updateUI();
      return;
    }
    this.playNext();
    this.updateUI();
    this.broadcastState();   // reflect stop/advance on reading-mode tab buttons
  }

  async playIndex(index) {
    if (index < 0 || index >= this.ayahs.length) return;
    // Fresh start after a stop → the range-pass counter begins a new session
    if (!this.audio.src) this._passesLeft = Math.max(1, this.rangePasses);
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
    this._repeatLeft = this.repeatEach;   // fresh ayah → reset its repeat counter
    this.audio.src = src;
    // Same track as last time? Resume near where the user left off.
    const saved = this.readSavedPosition();
    this._resumeTime = (saved && saved.src === src && Number.isFinite(saved.time))
      ? Math.max(0, saved.time - 2)       // small rewind for context
      : null;
    this.audio.playbackRate = this.speed;
    this.audio.play().catch(err => console.error('Audio playback failed:', err));
    this.updateUI();
  }

  playNext() {
    if (!this.ayahs.length) { this.stop(); return; }
    const start = this.rangeStartIndex();
    const end = this.rangeEndIndex();

    // Outside the A/B range (user tapped an ayah manually) → plain advance
    if (this.currentIndex < start || this.currentIndex > end) {
      if (this.currentIndex < this.ayahs.length - 1) this.playIndex(this.currentIndex + 1);
      else if (this.loopRange) this.playIndex(start);
      else this.stop();
      return;
    }

    if (this.currentIndex < end) {
      this.playIndex(this.currentIndex + 1);
      return;
    }
    // Reached the end of the range: loop forever, burn a pass, or stop
    if (this.loopRange || this.rangePasses === 0) {
      this.playIndex(start);              // loop back to the start of the range
    } else if (this._passesLeft > 1) {
      this._passesLeft--;
      this.playIndex(start);
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

  /** Apply a pending resume position once the duration is known. */
  onLoadedMetadata() {
    const dur = this.audio.duration;
    if (this._resumeTime != null) {
      if (Number.isFinite(dur) && this._resumeTime > 0 && this._resumeTime < dur - 1) {
        this.audio.currentTime = this._resumeTime;
      }
      this._resumeTime = null;
    }
    this.updateProgress(true);
  }

  // --- Position persistence (hifz: pick up a long ayah where you left it) ---

  savePosition() {
    const src = this.audio.currentSrc || this.audio.src;
    const time = this.audio.currentTime;
    if (!src || !Number.isFinite(time) || this.audio.ended) return;
    try { localStorage.setItem(this.posKey, JSON.stringify({ src, time })); } catch (e) { /* storage full/blocked */ }
  }

  readSavedPosition() {
    try { return JSON.parse(localStorage.getItem(this.posKey) || 'null'); } catch (e) { return null; }
  }

  clearSavedPosition() {
    try { localStorage.removeItem(this.posKey); } catch (e) { /* ignore */ }
  }

  // --- Seek / progress bar ---

  fmtTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  seekLabel() {
    return this.tr('audio_seek', 'Seek');
  }

  /** Repaint time labels + scrubber (throttled to ~4Hz unless forced). */
  updateProgress(force = false) {
    const now = performance.now();
    if (!force && now - this._lastProgressAt < 250) return;
    this._lastProgressAt = now;
    this.updateSleepBadge();

    const bar = document.getElementById('audio-seek');
    if (!bar) return;

    const dur = this.audio.duration;
    const cur = this.audio.currentTime || 0;
    const durEl = document.getElementById('audio-time-dur');
    if (durEl) durEl.textContent = this.fmtTime(dur);
    if (this._seeking) return;              // user is dragging — don't fight them
    if (Number.isFinite(dur) && dur > 0) {  // metadata loaded
      bar.max = dur;
      bar.value = cur;
    } else {
      bar.value = 0;
    }
    const curEl = document.getElementById('audio-time-cur');
    if (curEl) curEl.textContent = this.fmtTime(cur);
  }

  /** Wire up the (re-rendered) scrubber inside the now-playing card. */
  bindSeekBar() {
    const bar = document.getElementById('audio-seek');
    if (!bar) return;
    bar.addEventListener('input', () => {
      this._seeking = true;
      const curEl = document.getElementById('audio-time-cur');
      if (curEl) curEl.textContent = this.fmtTime(parseFloat(bar.value) || 0);
    });
    bar.addEventListener('change', () => {
      const dur = this.audio.duration;
      if (Number.isFinite(dur) && dur > 0) {  // guard: metadata not loaded yet
        this.audio.currentTime = Math.min(parseFloat(bar.value) || 0, dur);
      }
      this._seeking = false;
      this.updateProgress(true);
    });
  }

  /** Drive the word highlight from the audio clock. */
  onTimeUpdate() {
    this.updateProgress();
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
        <span class="text-[0.6875rem] text-gray-500 dark:text-gray-400" dir="auto">${w.meaning || ''}</span>
      </span>`).join('');
    el.innerHTML = `
      <div class="text-xs text-gray-400 mb-2 text-center">${ayah.surahName || ''} ${ayah.key}</div>
      <div class="ayah-arabic !text-3xl !leading-loose text-center mb-3" dir="rtl">${ayah.arabic || ''}</div>
      <div class="flex flex-wrap justify-center gap-x-1 gap-y-1" dir="rtl">${words}</div>
      <div class="mt-3 flex items-center gap-2" dir="ltr">
        <span id="audio-time-cur" class="text-[0.75rem] tabular-nums text-gray-500 dark:text-gray-400 w-9 text-right shrink-0">0:00</span>
        <input id="audio-seek" type="range" min="0" max="100" step="0.1" value="0"
               class="flex-1 h-1.5 min-w-0 accent-primary cursor-pointer"
               aria-label="${this.seekLabel()}">
        <span id="audio-time-dur" class="text-[0.75rem] tabular-nums text-gray-500 dark:text-gray-400 w-9 shrink-0">0:00</span>
      </div>`;
    this.bindSeekBar();
    this.updateProgress(true);
  }

  renderList() {
    let list = document.getElementById('audio-ayah-list');
    if (!list) {
      list = document.createElement('div');
      list.id = 'audio-ayah-list';
      list.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-1';
      this.container.appendChild(list);
    }

    // New ayah set → refresh the A/B range selects (resets to the full range)
    this.populateRangeSelects();

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
