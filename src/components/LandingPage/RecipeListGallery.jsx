import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function RecipeListGallery() {
  const history = useHistory();
  const { recipesAll } = useSelector((state) => state.recipe);

  const handleClick = (recipeID) => {
    history.push(`/details/${recipeID}`);
  };

  return (
    <div>
      <ImageList sx={{ width: "100%" }} variant="woven" cols={3} gap={8}>
        {recipesAll.map((recipe) => (
          <ImageListItem
            key={recipe.recipeID}
            className="ImageList-item"
            onClick={() => handleClick(recipe.recipeID)}
          >
            <div className="overlay"></div>
            <img src={recipe.url} alt={recipe.recipename} loading="lazy" />
            <ImageListItemBar
              title={recipe.recipename}
              subtitle={recipe.description}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
