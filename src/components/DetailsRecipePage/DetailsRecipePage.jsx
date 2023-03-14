import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const DetailsRecipePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
const recipe = useSelector((state) => state.recipe.selectedRecipe)

  useEffect(() => {
    dispatch({ type: 'GET_RECIPE_BY_ID', payload: id });
  }, [dispatch, id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.recipename}</h1>
      <img src={recipe.url} alt={recipe.recipename} />
      <p>{recipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.split('\n').map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Directions</h2>
      <ol>
        {recipe.direction.split('\n').map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default DetailsRecipePage;
