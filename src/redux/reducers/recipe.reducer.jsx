const initialState = {
  recipesAll: [],
  recipesUser: [],
  selectedRecipe: null,
};

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_RECIPE_SUCCESS":
      return {
        ...state,
        recipesUser: [...state.recipesUser, action.payload],
      };
    case "GET_USER_RECIPES_SUCCESS":
      return {
        ...state,
        recipesUser: action.payload,
      };
    case "GET_ALL_RECIPES_SUCCESS":
      return {
        ...state,
        recipesAll: action.payload,
      };
    case "GET_SELECTED_RECIPE_SUCCESS":
      return {
        ...state,
        selectedRecipe: action.payload,
      };
    default:
      return state;
  }
}
