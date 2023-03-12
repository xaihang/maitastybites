import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getRecipes() {
  try {
    const response = yield call(axios.get, '/api/recipe');
    yield put({ type: 'GET_RECIPES_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error getting recipes:', error);
    yield put({ type: 'GET_RECIPES_ERROR' });
  }
}

function* addRecipe(action) {
  try {
    yield call(axios.post, '/api/recipe', action.payload);
    yield put({ type: 'ADD_RECIPE_SUCCESS' });
  } catch (error) {
    console.log('Error adding recipe:', error);
    yield put({ type: 'ADD_RECIPE_ERROR' });
  }
}

function* recipeSaga() {
  yield takeLatest('ADD_RECIPE', addRecipe);
  yield takeEvery('GET_RECIPES', getRecipes);
}

export default recipeSaga;
