import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', this._generateHtml());
  }

  update(data) {
    this._data = data;

    const newDOM = document
      .createRange()
      .createContextualFragment(this._generateHtml());
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const oldElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      // 1) Updates changed TEXT
      if (
        !newEl.isEqualNode(oldElements[i]) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        oldElements[i].textContent = newEl.textContent;
      }

      // 2) Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(oldElements[i])) {
        Array.from(newEl.attributes).forEach(attr =>
          oldElements[i].setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderError(msg = this._errorMsg) {
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderSuccess(msg = this._successMsg) {
    const html = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
}
