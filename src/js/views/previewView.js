import View from './view';

class previewView extends View {
  _generateHtml() {
    const recipeID = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === recipeID ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new previewView();