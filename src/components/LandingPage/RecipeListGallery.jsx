import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import CustomButton from "../UserPage/CustomButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function RecipeListGallery({ recipesList }) {
  const history = useHistory();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleClick = (recipeID) => {
    history.push(`/details/${recipeID}`);
  };

  const handleSaveRecipe = (event, recipeID) => {
    event.stopPropagation();
    if (savedRecipes.includes(recipeID)) {
      setSavedRecipes(savedRecipes.filter((id) => id !== recipeID));
    } else {
      setSavedRecipes([...savedRecipes, recipeID]);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmitSuccess(false);
  };

  return (
    <div>
      <ImageList sx={{ width: "100%" }} variant="woven" cols={3} gap={8}>
        {recipesList?.map((recipe) => (
          <ImageListItem
            key={recipe.recipeID}
            className="ImageList-item"
            onClick={() => handleClick(recipe.recipeID)}
          >
            <div className="overlay">
              <div className="saveRecipeToggleBtnDisplay">
                <CustomButton
                  onClick={(event) => handleSaveRecipe(event, recipe.recipeID)}
                  className={
                    savedRecipes.includes(recipe.recipeID)
                      ? "saveEdBtn"
                      : "saveBtn"
                  }
                >
                  {savedRecipes.includes(recipe.recipeID) ? "Saved" : "Save"}
                </CustomButton>
              </div>
            </div>

            <img src={recipe.url} alt={recipe.recipename} loading="lazy" />
            <ImageListItemBar
              title={recipe.recipename}
              subtitle={recipe.description}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Saved successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
