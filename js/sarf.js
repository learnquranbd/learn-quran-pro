/**
 * Sarf (صرف) — morphology charts for the Quran's most frequent roots.
 *
 * For each of the top ~30 roots, data/sarf.json holds every surface form that
 * actually occurs in the Quran (built from data/morphology), tagged with its
 * features. This module renders them as real, Quran-grounded paradigm tables:
 *   • Verbs  — conjugation by tense × person/gender × singular/dual/plural.
 *   • Nouns  — declension by gender/number × case (nominative/accusative/genitive).
 * Every cell shows the actual form, how many times it occurs, and a sample verse.
 *
 * Renders into #sarf-container (tab "sarf").
 */

class Sarf {
  constructor() {
    this.container = document.getElementById('sarf-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';
    this.data = null;
    this.root = null;
    this.loaded = false;

    window.addEventListener('tabChanged', (e) => { if (e.detail.tabId === 'sarf') this.ensureLoaded(); });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.loaded) this.render(); }
    });
  }

  tt(key) { return t(key, this.language); }

  async ensureLoaded() {
    if (this.loaded) { this.render(); return; }
    this.container.innerHTML = `<div class="text-center py-16 text-gray-400">${this.tt('loading')}</div>`;
    try {
      this.data = await fetch('data/sarf.json').then(r => r.json());
    } catch (e) {
      this.container.innerHTML = `<div class="text-center py-16 text-red-500">${this.tt('topics_load_error')}</div>`;
      return;
    }
    this.root = this.data.order[0];
    this.loaded = true;
    this.bindOnce();
    this.render();
  }

  bindOnce() {
    this.container.addEventListener('click', (e) => {
      const verse = e.target.closest('[data-verse]');
      if (verse && typeof ayahModal !== 'undefined' && ayahModal) {
        ayahModal.open(verse.getAttribute('data-verse'), { word: verse.getAttribute('data-word') });
      }
    });
    this.container.addEventListener('change', (e) => {
      if (e.target.id === 'sarf-root') { this.root = e.target.value; this.render(); }
    });
  }

  render() {
    const r = this.data.roots[this.root];
    const PERSON = { '1': this.tt('sarf_1st'), '2': this.tt('sarf_2nd'), '3': this.tt('sarf_3rd') };
    const NUM = { S: this.tt('sarf_singular'), D: this.tt('sarf_dual'), P: this.tt('sarf_plural') };
    this.container.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-4">
          <h2 class="text-2xl font-bold mb-1">🧬 ${this.tt('sarf_title')}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('sarf_subtitle')}</p>
        </div>
        <div class="flex justify-center mb-4">
          <select id="sarf-root" class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg">
            ${this.data.order.map(root => {
              const rr = this.data.roots[root];
              return `<option value="${root}" ${root === this.root ? 'selected' : ''}>${root}${rr.gloss ? ' — ' + this.esc(rr.gloss) : ''} (${rr.count})</option>`;
            }).join('')}
          </select>
        </div>
        <div class="text-center mb-6">
          <span class="ayah-arabic text-4xl" dir="rtl">${this.esc(this.root)}</span>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ${r.gloss ? `<span class="font-medium">${this.esc(r.gloss)}</span> · ` : ''}${r.count} ${this.tt('sarf_occurrences')}
          </div>
        </div>
        ${r.verbs.length ? this.verbSection(r.verbs, PERSON, NUM) : ''}
        ${r.nouns.length ? this.nounSection(r.nouns, NUM) : ''}
      </div>`;
  }

  // ---- Verbs: conjugation tables per tense -------------------------------
  verbSection(verbs, PERSON, NUM) {
    const tenses = [['perfect', this.tt('sarf_perfect')], ['imperfect', this.tt('sarf_imperfect')], ['imperative', this.tt('sarf_imperative')]];
    const rows = [['3', 'M'], ['3', 'F'], ['2', 'M'], ['2', 'F'], ['1', '']];
    const cols = ['S', 'D', 'P'];
    let html = `<h3 class="text-lg font-bold mb-2">🔤 ${this.tt('sarf_verbs')}</h3>`;
    for (const [tKey, tLabel] of tenses) {
      const set = verbs.filter(v => v.tense === tKey);
      if (!set.length) continue;
      html += `
        <div class="mb-5 overflow-x-auto">
          <div class="text-sm font-semibold text-secondary mb-1">${tLabel}</div>
          <table class="w-full text-center border-collapse">
            <thead><tr class="text-xs text-gray-400">
              <th class="p-1"></th>${cols.map(c => `<th class="p-1 font-medium">${NUM[c]}</th>`).join('')}
            </tr></thead>
            <tbody>
              ${rows.map(([p, g]) => {
                const label = p === '1' ? PERSON[p] : `${PERSON[p]} ${g === 'M' ? this.tt('sarf_masc') : this.tt('sarf_fem')}`;
                const cells = cols.map(c => {
                  const matches = set.filter(v => v.person === p && (p === '1' || v.gender === g) && v.number === c);
                  return `<td class="p-1 border border-gray-100 dark:border-gray-700">${this.cellHtml(matches)}</td>`;
                }).join('');
                if (!cols.some(c => set.some(v => v.person === p && (p === '1' || v.gender === g) && v.number === c))) return '';
                return `<tr><td class="p-1 text-xs text-gray-500 text-right whitespace-nowrap">${label}</td>${cells}</tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`;
    }
    return html;
  }

  // ---- Nouns: declension by (gender/number) × case -----------------------
  nounSection(nouns, NUM) {
    const cases = [['nominative', this.tt('sarf_nom')], ['accusative', this.tt('sarf_acc')], ['genitive', this.tt('sarf_gen')]];
    // distinct (gender, number, ntype) rows present
    const seen = [];
    for (const n of nouns) {
      const key = `${n.gender}|${n.number}|${n.ntype}`;
      if (!seen.find(x => x.key === key)) seen.push({ key, gender: n.gender, number: n.number, ntype: n.ntype });
    }
    const numOrder = { S: 0, D: 1, P: 2 };
    seen.sort((a, b) => ((numOrder[a.number] ?? 3) - (numOrder[b.number] ?? 3)) || a.gender.localeCompare(b.gender));
    let html = `<h3 class="text-lg font-bold mb-2 mt-4">📐 ${this.tt('sarf_nouns')}</h3>
      <div class="overflow-x-auto"><table class="w-full text-center border-collapse">
        <thead><tr class="text-xs text-gray-400">
          <th class="p-1"></th>${cases.map(c => `<th class="p-1 font-medium">${c[1]}</th>`).join('')}
        </tr></thead><tbody>`;
    for (const row of seen) {
      const parts = [];
      if (row.gender) parts.push(row.gender === 'M' ? this.tt('sarf_masc') : this.tt('sarf_fem'));
      parts.push(NUM[row.number] || row.number);
      if (row.ntype !== 'noun') parts.push(this.tt('sarf_type_' + row.ntype.replace('-', '_')) || row.ntype);
      const label = parts.join(' · ');
      const cells = cases.map(([cKey]) => {
        const matches = nouns.filter(n => n.gender === row.gender && n.number === row.number && n.ntype === row.ntype && n.case === cKey);
        return `<td class="p-1 border border-gray-100 dark:border-gray-700">${this.cellHtml(matches)}</td>`;
      }).join('');
      html += `<tr><td class="p-1 text-xs text-gray-500 text-right whitespace-nowrap">${label}</td>${cells}</tr>`;
    }
    html += `</tbody></table></div>`;
    return html;
  }

  cellHtml(matches) {
    if (!matches.length) return '<span class="text-gray-300 dark:text-gray-600">—</span>';
    // distinct forms
    const byForm = {};
    for (const m of matches) { if (!byForm[m.form]) byForm[m.form] = m; }
    return Object.values(byForm).map(m => `
      <button data-verse="${m.ref}" data-word="${this.esc(m.form)}" title="${m.count}× · ${m.ref}${m.meaning ? ' · ' + this.esc(m.meaning) : ''}" class="inline-block px-1 rounded hover:bg-primary hover:text-white">
        <span class="ayah-arabic text-xl" dir="rtl">${this.esc(m.form)}</span>
        ${m.meaning ? `<span class="block text-[10px] text-gray-500 dark:text-gray-400 leading-tight max-w-[90px] truncate mx-auto" dir="auto">${this.esc(m.meaning)}</span>` : ''}
        <span class="block text-[10px] text-gray-400 leading-none">×${m.count}</span>
      </button>`).join(' ');
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
}

let sarf;
document.addEventListener('DOMContentLoaded', () => { sarf = new Sarf(); });
