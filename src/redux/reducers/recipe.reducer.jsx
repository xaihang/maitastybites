const initialState = {
  recipesAll: [],
  recipesUser: [],
  selectedRecipe: null,
  comment: [],
  savedRecipes: [],
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
        selectedRecipe: action.payload[0],
      };
    case "UPDATE_RECIPE_SUCCESS":
      return state;
    case "DELETE_RECIPE_SUCCESS":
      return {
        ...state,
        recipesUser: state.recipesUser.filter(
          (recipe) => recipe.recipeID !== action.payload
        ),
      };
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "GET_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: action.payload,
      };
    case "SAVE_RECIPE":
      return {
        ...state,
        savedRecipes: [...state.savedRecipes, action.payload],
      };
    case "GET_SAVED_RECIPES_SUCCESS":
      return {
        ...state,
        savedRecipes: action.payload,
      };
    default:
      return state;
  }
}
