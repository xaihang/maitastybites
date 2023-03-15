const initialState = {
  recipesAll: [],
  recipesUser: [],
  selectedRecipe: null,
};

export default function recipeReducer(state = initialState, action) {
  console.log("state", state);
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
      console.log("action.payload[0]===", action.payload[0]);
      return {
        ...state,
        selectedRecipe: action.payload[0],
      };
    case "UPDATE_RECIPE_SUCCESS": 
      return state;
      case "DELETE_RECIPE_SUCCESS":
        return {
          ...state,
          recipesUser: state.recipesUser.filter(recipe => recipe.recipeID !== action.payload)
        }
    default:
      return state;
  }
}
