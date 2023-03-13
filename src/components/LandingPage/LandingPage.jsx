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

  const {recipesAll} = useSelector((state) => state.recipe);
console.log('recipesAll', recipesAll)
  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h1>All Recipes</h1>
    
    </div>
  );
}

export default LandingPage;
