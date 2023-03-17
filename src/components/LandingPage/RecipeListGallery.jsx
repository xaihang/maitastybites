import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import CustomButton from "../UserPage/CustomButton";

export default function RecipeListGallery({recipesList}) {
  const history = useHistory();
  const [savedRecipes, setSavedRecipes] = useState([]);

  const handleClick = (recipeID) => {
    history.push(`/details/${recipeID}`);
  };

  const handleSaveRecipe = (recipeID) => {
    if (savedRecipes.includes(recipeID)) {
      setSavedRecipes(savedRecipes.filter((id) => id !== recipeID));
    } else {
      setSavedRecipes([...savedRecipes, recipeID]);
    }
  };


  return (
    <div>
      <ImageList sx={{ width: "100%" }} variant="woven" cols={3} gap={8}>
        {recipesList?.map((recipe) => (
          <ImageListItem key={recipe.recipeID} className="ImageList-item">
            <div className="overlay"></div>
            <img src={recipe.url} alt={recipe.recipename} loading="lazy" />
            <ImageListItemBar
              title={recipe.recipename}
              subtitle={recipe.description}
              actionIcon={
                <CustomButton
                  onClick={() => handleSaveRecipe(recipe.recipeID)}
                  className={savedRecipes.includes(recipe.recipeID) ? "saveEdBtn" : "saveBtn"}
                >
                  {savedRecipes.includes(recipe.recipeID) ? "Saved" : "Save"}
                </CustomButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}