import View from './view';
import previewView from './previewView';

class bookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateHtml() {
    return this._data.map(d => previewView.render(d, false)).join('');
  }
}

export default new bookmarksView();
