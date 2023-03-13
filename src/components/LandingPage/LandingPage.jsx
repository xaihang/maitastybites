import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useDispatch, useSelector } from 'react-redux';

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_ALL_RECIPES' });
  }, [dispatch]);

  const { recipesAll } = useSelector((state) => state.recipe);

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h1>All Recipes</h1>
      <ImageList sx={{ width: '100%' }} variant="woven" cols={3} gap={8}>
        {recipesAll.map((recipe) => (
          <ImageListItem key={recipe.recipeID}>
            <img
              src={recipe.url}
              alt={recipe.recipename}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default LandingPage;
