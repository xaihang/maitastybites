import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';


function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_ALL_RECIPES' });
  }, [dispatch]);

  const {recipesAll} = useSelector((state) => state.recipe);
console.log('recipesAll', recipesAll)
  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h1>All Recipes</h1>
      <div className="recipe-list">
        {recipesAll.map((recipe) => (
          <RecipeCard
            key={recipe.recipeID}
            name={recipe.recipename}
            description={recipe.description}
            ingredients={recipe.ingredients}
            direction={recipe.direction}
            imageUrl={recipe.url}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
