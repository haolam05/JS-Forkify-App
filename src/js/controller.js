import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

    // 5) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 6) Update bookmarks view to mark selected search result
    bookmarksView.update(model.state.bookmarks);
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
    resultsView.render(model.getSearchResultsPage());

    // 5) Render Pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1) Update the recipe servings (in state)
  model.updateServings(newServings);

  // 2) Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/Remove bookmark for current recipe
  model.state.recipe.bookmarked
    ? model.delBookmark(model.state.recipe.id)
    : model.addBookmark(model.state.recipe);

  // 2) Update the recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHanlderAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
};
init();
