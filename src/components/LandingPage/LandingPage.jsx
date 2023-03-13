import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from '../UserPage/RecipeList';


function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_ALL_RECIPES' });
  }, [dispatch]);

  const recipes = useSelector((state) => state.recipe.recipes);

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h1>All Recipes</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default LandingPage;
