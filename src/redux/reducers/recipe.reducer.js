const initialState = {
    recipes: [],
  };
  
  export default function recipeReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_RECIPE_SUCCESS':
        return {
          ...state,
          recipes: [...state.recipes, action.payload],
        };
      default:
        return state;
    }
  }