import View from './view';
import icons from 'url:../../img/icons.svg';

class resultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMsg = 'No recipes found for your query! Please try again!';

  _generateHtml() {
    return this._data.map(this._generateHtmlPreview).join('');
  }

  _generateHtmlPreview(d) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${d.id}">
          <figure class="preview__fig">
            <img src="${d.image}" alt="${d.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${d.title}</h4>
            <p class="preview__publisher">${d.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new resultsView();
