import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomButton from "../UserPage/CustomButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

export default function RecipeListGallery({
  recipesList,
  fromDashboard = false,
}) {
  const history = useHistory();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [updatedRecipesList, setUpdatedRecipesList] = useState(recipesList);

  useEffect(() => {
    setUpdatedRecipesList(recipesList);
  }, [recipesList]);

  const handleClick = (recipeID) => {
    history.push(`/details/${recipeID}`);
  };

  const handleSaveRecipe = (event, recipeID) => {
    event.stopPropagation();

    if (Object.keys(user).length === 0) {
      history.push(`/login`);
      return
    }
    const data = {
      recipeID,
      id: user.id,
    };

    dispatch({ type: "SAVE_RECIPE", payload: data });
    dispatch({ type: "GET_ALL_RECIPES" });

    setSubmitSuccess(true);
  };

  const handleUnSaveRecipe = (event, savedID) => {
    event.stopPropagation();

    dispatch({ type: "UNSAVE_RECIPE", payload: savedID });
    dispatch({ type: "GET_ALL_RECIPES" });

    setSubmitSuccess(true);
  };

  const handleDeleteSaveRecipe = (event, savedID) => {
    event.stopPropagation();
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "UNSAVE_RECIPE", payload: savedID });
  
        // Remove the deleted recipe from updatedRecipesList
        const updatedList = updatedRecipesList.filter(
          (recipe) => recipe.saved !== savedID
        );
        setUpdatedRecipesList(updatedList);
  
        setSubmitSuccess(true);
  
        Swal.fire("Deleted!", "Your saved recipe has been deleted.", "success");
      }
    });
  };


  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmitSuccess(false);
  };

  const buttonToDisplay = (recipe) => {
    if (!fromDashboard)
      return (
        <CustomButton
          onClick={(event) =>
            recipe.saved
              ? handleUnSaveRecipe(event, recipe.saved)
              : handleSaveRecipe(event, recipe.recipeID)
          }
          className={recipe.saved ? "saveEdBtn" : "saveBtn"}
        >
          {recipe.saved ? "Saved" : "Save"}
        </CustomButton>
      );

    return (
      <CustomButton
        onClick={(event) => handleDeleteSaveRecipe(event, recipe.saved)}
        className={"saveBtn"}
      >
        Delete
      </CustomButton>
    );
  };

  return (
    <div>
      <ImageList sx={{ width: "100%" }} variant="woven" cols={4} gap={8}>
        {updatedRecipesList?.map((recipe, i) => (
          <ImageListItem
            key={i}
            className="ImageList-item"
            onClick={() => handleClick(recipe.recipeID)}
          >
            <div className="overlay">
              <div className="saveRecipeToggleBtnDisplay">
                {buttonToDisplay(recipe)}
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
    </div>
  );
}
