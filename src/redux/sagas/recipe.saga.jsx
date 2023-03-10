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
  console.log('calllll')
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
}
export default recipeSaga;
