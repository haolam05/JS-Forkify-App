import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const recipeID = window.location.hash.slice(1);
    if (!recipeID) return;
    console.log(recipeID);
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(recipeID);

    // 2) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
