import View from './view';
import previewView from './previewView';

class resultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMsg = 'No recipes found for your query! Please try again!';

  _generateHtml() {
    return this._data.map(d => previewView.render(d, false)).join('');
  }
}

export default new resultsView();
