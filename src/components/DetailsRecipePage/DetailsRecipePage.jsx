import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./DetailsRecipePage.css";
import RecipeCommentForm from "./RecipeCommentForm";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import { Box, Typography } from "@mui/material";
import CustomButton from "../UserPage/CustomButton";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Modal from "@mui/material/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkIcon from "@mui/icons-material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Divider } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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

const ShareModal = ({ open, handleClose, url }) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const handleCopyLink = () => {
    setShowCopySuccess(true);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "25px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Share this recipe
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <div className="share-icons">
              <div
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${url}`
                  )
                }
              >
                <FacebookIcon sx={{ fontSize: "50px", marginRight: "10px" }} />
              </div>
              <div
                onClick={() =>
                  window.open(`https://twitter.com/intent/tweet?url=${url}`)
                }
              >
                <TwitterIcon sx={{ fontSize: "50px" }} />
              </div>
            </div>
          </Box>

          <Box sx={{ position: "relative" }}>
            <CopyToClipboard text={url} onCopy={handleCopyLink}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LinkIcon />}
                sx={{ mb: 1 }}
              >
                Copy link
              </Button>
            </CopyToClipboard>
            {showCopySuccess && (
              <Alert
                sx={{ position: "absolute", top: 0, right: 0 }}
                severity="success"
                onClose={() => setShowCopySuccess(false)}
              >
                <AlertTitle>Link copied to clipboard</AlertTitle>
                {url}
              </Alert>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const DetailsRecipePage = () => {
  const url = window.location.href;
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipe = useSelector((state) => state.recipe.selectedRecipe);
  const [recipeSelected, setRecipeSelected] = useState(recipe)
  const comments = useSelector((state) => state.recipe.comments);
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    setRecipeSelected(recipe)
  }, [recipe])
  
  useEffect(() => {
    const data = { recipeID: id, id: user.id };
    dispatch({ type: "GET_RECIPE_BY_ID", payload: data });
    dispatch({ type: "GET_COMMENTS", payload: id });
  }, [dispatch, id, user]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Calculate the average rating
  const sumRating = comments?.reduce((acc, comment) => acc + comment.rating, 0);
  const avgRating = sumRating / comments?.length;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSaveRecipe = (recipeID) => {
    const data = { recipeID, id: user.id };
    dispatch({ type: "SAVE_RECIPE", payload: data });
    dispatch({ type: "GET_RECIPE_BY_ID", payload: data });
    setRecipeSelected((prevState) => ({ ...prevState, saved: true }));
  };

  const handleUnSaveRecipe = (savedID, recipeID) => {
    const data = { recipeID, id: user.id };
    dispatch({ type: "UNSAVE_RECIPE", payload: savedID });
    dispatch({ type: "GET_RECIPE_BY_ID", payload: data });
    setRecipeSelected((prevState) => ({ ...prevState, saved: false }));
  };

  
  return (
    <>
      <div className="parent-details-container">
        <div className="child-details-container">
          <div className="recipe-details">
            <div className="recipe-info">
              <h1>{recipeSelected?.recipename}</h1>
              <p>{recipeSelected?.description}</p>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating value={avgRating} precision={0.5} readOnly />
                <Typography
                  variant="subtitle2"
                  sx={{ ml: 1, color: "text.secondary" }}
                >
                  ({!avgRating ? 0 : avgRating.toFixed(1)} stars)
                </Typography>
              </Box>

              <div className="buttons-details-page">
              <CustomButton
                  onClick={() =>
                    recipeSelected?.saved
                      ? handleUnSaveRecipe(recipeSelected?.saved, recipeSelected?.recipeID)
                      : handleSaveRecipe(recipeSelected?.recipeID)
                  }
                  className={recipeSelected?.saved ? "saveEdBtn" : "saveBtn"}
                >
                  {recipeSelected?.saved ? "Saved" : "Save"}
                </CustomButton>
                <ShareButton onClick={handleOpen}>Share</ShareButton>
                <ShareModal
                  open={openModal}
                  handleClose={handleClose}
                  url={url}
                />
              </div>
            </div>
            <div className="recipe-image">
              <img src={recipeSelected?.url} alt={recipeSelected?.recipename} />
            </div>
          </div>
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipeSelected?.ingredients.split("\n").map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="recipe-directions">
            <h2>Directions</h2>
            <ol>
              {recipeSelected?.direction.split("\n").map((step, index) => (
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
