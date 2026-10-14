(() => {
  const search = document.querySelector('#publication-search');
  if (!search) return;
  const row = document.querySelector('.search-row');
  const clear = document.querySelector('.clear-search');
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#no-results');
  const papers = [...document.querySelectorAll('.paper')];
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const searchable = new Map(papers.map(paper => [paper, normalize(paper.textContent)]));
  function filter() {
    const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let matches = 0;
    for (const paper of papers) {
      const shown = terms.every(term => searchable.get(paper).includes(term));
      paper.hidden = !shown;
      if (shown) matches++;
    }
    count.textContent = terms.length ? `${matches} of ${papers.length} papers` : `${papers.length} papers`;
    empty.hidden = matches !== 0;
    clear.hidden = search.value.length === 0;
  }
  search.addEventListener('input', filter);
  clear.addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape') { search.value = ''; filter(); }
  });
  row.hidden = false;
  filter();
})();
