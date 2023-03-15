import React, { useState } from "react";
import CustomButton from "../UserPage/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Box,
  Button,
  Rating,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

const RecipeCommentForm = ({ recipeId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const dispatch = useDispatch();
    const comments = useSelector(state => state.recipe.comments);
  
    const handleRatingChange = (event, value) => {
      setRating(value);
    };
  
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const newComment = {
        rating: rating,
        comment: comment.trim(),
        recipeId: recipeId
      };
      dispatch({ type: "ADD_COMMENT", payload: newComment });
      setRating(0);
      setComment("");
      setSubmitSuccess(true);
    };
  
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSubmitSuccess(false);
    };
  
    useEffect(() => {
        dispatch({ type: "GET_COMMENTS", payload: recipeId });
      }, [dispatch, recipeId]);

    return (
      <div className="comment-container">
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ width: "50%" }}>
        <h1>Leave a reply</h1>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Typography sx={{mr: 2}} fontWeight="bold">
                Made it? Leave a review!
              </Typography>
              <Rating
                name="rating"
                value={rating}
                precision={1}
                onChange={handleRatingChange}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                id="comment"
                label="Comment (optional)"
                multiline
                rows={4}
                value={comment}
                onChange={handleCommentChange}
                fullWidth
                sx={{ borderColor: "#E0E0E0", borderRadius: 0 }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
            <CustomButton
              type="submit"
              variant="contained"
              className="postCommentBtn"
      
            >
              Post Comment
            </CustomButton>
            <h2>Comments</h2>
            </Box>
          </form>
          <Snackbar open={submitSuccess} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
              Comment submitted successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      </div>
    );
  };
  
export default RecipeCommentForm;
