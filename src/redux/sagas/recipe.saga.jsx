import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getUserRecipes() {
  // console.log("getUserRecipes");
  try {
    const response = yield call(axios.get, "/api/recipe/user");
    console.log("response", response);
    yield put({ type: "GET_USER_RECIPES_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error getting recipes:", error);
    yield put({ type: "GET_USER_RECIPES_ERROR" });
  }
}

function* getAllRecipes() {
  // console.log("getAllRecipes");
  try {
    const response = yield call(axios.get, "/api/recipe");
    console.log("response", response);
    yield put({ type: "GET_ALL_RECIPES_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error getting all recipes:", error);
    yield put({ type: "GET_ALL_RECIPES_ERROR" });
  }
}

function* addRecipe(action) {
  try {
    yield call(axios.post, "/api/recipe", action.payload);
    yield put({ type: "ADD_RECIPE_SUCCESS" });
    yield put({ type: "GET_USER_RECIPES" });
  } catch (error) {
    console.log("Error adding recipe:", error);
    yield put({ type: "ADD_RECIPE_ERROR" });
  }
}

function* getRecipeById(action) {
  try {
    const response = yield call(axios.get, `/api/recipe/${action.payload}`);
    yield put({ type: "GET_SELECTED_RECIPE_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error getting recipe by id:", error);
    yield put({ type: "GET_RECIPE_BY_ID_ERROR" });
  }
}


function* updateRecipe(action) {
  try {
    const { recipename, description, ingredients, direction, url, recipeID } =
      action.payload;
    yield call(axios.put, `/api/recipe/${recipeID}`, {
      recipename,
      description,
      ingredients,
      direction,
      url,
    });
    yield put({ type: "UPDATE_RECIPE_SUCCESS" });
    yield put({ type: "GET_USER_RECIPES" }); // refresh the user's recipes
    handleClose();
  } catch (error) {
    console.log("Error updating recipe:", error);
    yield put({ type: "UPDATE_RECIPE_ERROR" });
  }
}

function* deleteRecipe(action) {
  try {
    yield call(axios.delete, `/api/recipe/${action.payload}`);
    yield put({ type: "DELETE_RECIPE_SUCCESS" });
    yield put({ type: "GET_USER_RECIPES" }); // refresh the user's recipes
  } catch (error) {
    console.log("Error deleting recipe:", error);
    yield put({ type: "DELETE_RECIPE_ERROR" });
  }
}

// add comment to a recipe
function* addComment(action) {
  try {
    yield call(axios.post, `/api/comments`, action.payload);
    // yield put({ type: "ADD_COMMENT_SUCCESS" });
    yield put({ type: "GET_COMMENTS", payload: action.payload.recipeid }); // Refresh comments
  } catch (error) {
    console.log("Error adding comment:", error);
    yield put({ type: "ADD_COMMENT_ERROR" });
  }
}

// get comments 
function* getComments(action) {
  // console.log('getcomments on saga====ssasd', action.payload);

  const recipeid = action.payload
// console.log('hmmm', recipeid)
  try {
    const response = yield call(axios.get, `/api/comments/${recipeid}`);
    yield put({ type: "GET_COMMENTS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error getting comments:", error);
    yield put({ type: "GET_COMMENTS_ERROR" });
  }
}

function* saveRecipe(action) {
  try {
    yield call(axios.post, "/api/recipe/save", action.payload);
    yield put({ type: "SAVE_RECIPE_SUCCESS", payload: action.payload });
  } catch (error) {
    console.log("Error saving recipe:", error);
    yield put({ type: "SAVE_RECIPE_ERROR" });
  }
}

function* unSaveRecipe(action) {
  try {
    yield call(axios.delete, "/api/recipe/unsave", action.payload);

  } catch (error) {
    console.log("Error unsaving recipe:", error);
    yield put({ type: "UNSAVE_RECIPE_ERROR" });
  }
}

function* getSavedRecipes(action) {
  try {
    const response = yield call(axios.get, `/api/recipe/${action.payload}`);
    yield put({ type: "GET_SAVED_RECIPES_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error getting saved recipes:", error);
    yield put({ type: "GET_SAVED_RECIPES_ERROR" });
  }
}

function* recipeSaga() {
  yield takeLatest("ADD_RECIPE", addRecipe);
  yield takeEvery("GET_ALL_RECIPES", getAllRecipes);
  yield takeEvery("GET_USER_RECIPES", function* () {
    console.log("GET_USER_RECIPES action dispatched");
    yield call(getUserRecipes);
    console.log("GET_USER_RECIPES finished");
  });
  yield takeLatest("GET_RECIPE_BY_ID", getRecipeById);
  yield takeLatest("UPDATE_RECIPE", updateRecipe);
  yield takeLatest("DELETE_RECIPE", deleteRecipe);
  yield takeLatest("ADD_COMMENT", addComment);
  yield takeLatest("GET_COMMENTS", getComments);
  yield takeLatest("SAVE_RECIPE", saveRecipe);
  yield takeLatest("UNSAVE_RECIPE", unSaveRecipe);
  yield takeLatest("GET_SAVED_RECIPES", getSavedRecipes);
}
export default recipeSaga;
