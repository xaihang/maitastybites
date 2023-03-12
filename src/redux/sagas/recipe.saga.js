import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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
}

export default recipeSaga;
