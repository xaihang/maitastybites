import React, { useState } from "react";
import CustomButton from "../UserPage/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { Rating } from "@mui/material";
import {
  Box,
  Button,
  Rating,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const RecipeCommentForm = ({ recipeId }) => {
  console.log("recipeId", recipeId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.recipe.comments);
  console.log("commentscomments", comments);
  const user = useSelector((store) => store.user);
  console.log("user", user);
  const username = useSelector((store) => store.username);
  console.log("username", user.username);

  // format timestamp 
  const formattedComments = comments.map((comment) => ({
    ...comment,
    formattedTimestamp: moment(comment.created_at).format(
      "MMMM D, YYYY [at] h:mm a"
    ),
  }));

  // calculate the average rating on recipe
  const recipeComments = useSelector((state) => state.recipe.comments);
const recipeAverageRating =
  recipeComments.reduce((acc, comment) => acc + comment.rating, 0) /
  recipeComments.length;

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
      recipeid: recipeId,
      id: user.id,
    };
    console.log("newComment", newComment);
    console.log("recipeId", recipeId);
    dispatch({ type: "ADD_COMMENT", payload: newComment });
    dispatch({ type: "GET_COMMENTS", payload: recipeId });
    setRating(0);
    setComment("");
    setSubmitSuccess(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmitSuccess(false);
  };

  useEffect(() => {
    dispatch({ type: "GET_COMMENTS", payload: recipeId });
  }, [dispatch, recipeId]);

  return (
    <div className="comment-container">
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ width: "50%" }}>
          <h1>Leave a reply</h1>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Typography sx={{ mr: 2 }} fontWeight="bold">
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
              {formattedComments.map((comment) => (
                <div key={comment.commentID}>
                  <Typography variant="body1" fontWeight="bold">
                    {comment.username} - {comment.formattedTimestamp}
                  </Typography>
                  <Rating value={comment.rating} readOnly />
                  <Typography variant="body2">
                    comments: {comment.comment}
                  </Typography>
                </div>
              ))}
            </Box>
          </form>
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
              Comment submitted successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </div>
  );
};

export default RecipeCommentForm;
