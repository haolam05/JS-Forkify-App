import View from './view';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline ');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }

  _generateHtml() {
    const currPage = this._data.page;
    const resultPerPage = this._data.resultsPerPage;
    const numPages = Math.ceil(this._data.results.length / resultPerPage);

    // 1) Page 1 and there are NO other pages   (no buttons)
    if (currPage === 1 && numPages === 1) return '';

    // 2) Page 1 and there are other pages      (right button)
    if (currPage === 1) return this._getBtn(currPage, false);

    // 3) Last page                             (left button)
    if (currPage + 1 > numPages) return this._getBtn(currPage);

    // 4) Page > 1 and there are other pages    (both buttons)
    return this._getBtn(currPage) + this._getBtn(currPage, false);
  }

  _getBtn(currPage, isLeft = true) {
    const goToPage = isLeft ? currPage - 1 : currPage + 1;
    const prevNext = isLeft ? 'prev' : 'next';
    const leftRight = isLeft ? 'left' : 'right';
    return `
      <button data-goto="${goToPage}" class="btn--inline pagination__btn--${prevNext}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${leftRight}"></use>
        </svg>
        <span>Page ${goToPage}</span>
      </button>
    `;
  }
}
export default new paginationView();
