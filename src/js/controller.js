import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // 1) Get recipe ID
    const recipeID = window.location.hash.slice(1);
    if (!recipeID) return;

    // 2 Render Spinner
    recipeView.renderSpinner();

    // 3) Load Recipe
    await model.loadRecipe(recipeID);

    // 4) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Render Spinner
    resultsView.renderSpinner();

    // 3) Load Search Results
    await model.loadSearchResults(query);

    // 4) Render Search Results
    resultsView.render(model.state.search.results);
  } catch (err) {
    resultsView.renderError(err);
  }
};
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
