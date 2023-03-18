import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./DetailsRecipePage.css";
import RecipeCommentForm from "./RecipeCommentForm";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import { Box, Typography } from "@mui/material";
import CustomButton from "../UserPage/CustomButton";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";

const ShareButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#EFEFEF",
  border: "black",
  outline: "none",
  padding: "10px 20px",
  marginTop: "10px",
  transition: "all 0.3s ease",
  border: "1px solid darkgrey",
  borderRadius: "25px",
  "&:hover": {
    backgroundColor: "#BDBDBD",
    color: "black",
  },
}));

const DetailsRecipePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipe = useSelector((state) => state.recipe.selectedRecipe);
  const comments = useSelector((state) => state.recipe.comments);

 

  useEffect(() => {
    dispatch({ type: "GET_RECIPE_BY_ID", payload: id });
    dispatch({ type: "GET_COMMENTS", payload: id });
  }, [dispatch, id]);


  if (!recipe) {
    return <div>Loading...</div>;
  }

    // Calculate the average rating
    const sumRating = comments?.reduce((acc, comment) => acc + comment.rating, 0);
    const avgRating = sumRating / comments?.length;

  return (
    <>
      <div className="parent-details-container">
        <div className="child-details-container">
          <div className="recipe-details">
            <div className="recipe-info">
              <h1>{recipe.recipename}</h1>
              <p>{recipe.description}</p>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating value={avgRating} precision={0.5} readOnly />
                <Typography
                  variant="subtitle2"
                  sx={{ ml: 1, color: "text.secondary" }}
                >
                  ({avgRating.toFixed(1)} stars)
                </Typography>
              </Box>

              <div className="buttons-details-page">
                <CustomButton className="saveBtn"  sx={{ marginRight: "10px" }}>Save</CustomButton>
                <ShareButton>Share</ShareButton>
              </div>


            </div>
            <div className="recipe-image">
              <img src={recipe.url} alt={recipe.recipename} />
            </div>

      

          </div>
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.split("\n").map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="recipe-directions">
            <h2>Directions</h2>
            <ol>
              {recipe.direction.split("\n").map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <RecipeCommentForm recipeId={id} />
    </>
  );
};

export default DetailsRecipePage;
