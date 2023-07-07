import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1, // current page
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [], // bookmarked recipes
};

export const loadRecipe = async function (recipeID) {
  try {
    const data = await getJSON(`${API_URL}/${recipeID}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    state.recipe.bookmarked = state.bookmarks.some(bR => bR.id === recipe.id);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.query = query;
    state.search.page = 1;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = state.search.resultsPerPage * (page - 1);
  const end = state.search.resultsPerPage * page;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (newServings * ing.quantity) / state.recipe.servings)
  );
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const delBookmark = function (id) {
  const bookmarkedIdx = state.bookmarks.findIndex(bR => bR.id === id);
  state.bookmarks.splice(bookmarkedIdx, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
