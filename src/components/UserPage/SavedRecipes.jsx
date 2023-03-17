import { useDispatch } from "react-redux";

export default function SavedRecipes() {
  const dispatch = useDispatch();

  const handleSaveRecipe = () => {
    const recipeData = {
      // your recipe data here
      recipename,
      description,
      ingredients,
      direction,
      url,
      userId,
    };
    dispatch({ type: "SAVE_RECIPE", payload: recipeData });
  };

  return (
    <div>
      <h1>Saved Recipes</h1>
      <button onClick={handleSaveRecipe}>Save Recipe</button>
    </div>
  );
}
