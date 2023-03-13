import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useDispatch, useSelector } from "react-redux";

export default function RecipeListGallery() {
  const { recipesAll } = useSelector((state) => state.recipe);

  return (
    <div>
      <ImageList sx={{ width: "100%" }} variant="woven" cols={3} gap={8}>
        {recipesAll.map((recipe) => (
          <ImageListItem key={recipe.recipeID} className="ImageList-item">
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
