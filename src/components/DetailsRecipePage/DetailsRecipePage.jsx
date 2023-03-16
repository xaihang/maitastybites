import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./DetailsRecipePage.css";
import RecipeCommentForm from "./RecipeCommentForm";

const DetailsRecipePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipe = useSelector((state) => state.recipe.selectedRecipe);

  useEffect(() => {
    dispatch({ type: "GET_RECIPE_BY_ID", payload: id });
  }, [dispatch, id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="parent-details-container">
        <div className="child-details-container">
          <div className="recipe-details">
            <div className="recipe-info">
              <h1>{recipe.recipename}</h1>
              <p>{recipe.description}</p>
            </div>
            <div className="recipe-image">
              <img src={recipe.url} alt={recipe.recipename} />
            </div>
          </div>
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.split("\n").map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="recipe-directions">
            <h2>Directions</h2>
            <ol>
              {recipe.direction.split("\n").map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <RecipeCommentForm recipeId={id} />
    </>
  );
};

export default DetailsRecipePage;
