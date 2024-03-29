import React, { useState } from "react";
import CustomButton from "../UserPage/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import "./DetailsRecipePage.css";
import { useHistory } from "react-router-dom";

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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.recipe.comments);
  const user = useSelector((store) => store.user);
  const history = useHistory();


  // format timestamp
  const formattedComments = comments?.map((comment) => ({
    ...comment,
    formattedTimestamp: moment(comment.created_at).format(
      "MMMM D, YYYY [at] h:mm a"
    ),
  }));

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(user).length === 0) {
      history.push(`/login`);
      return
    }

    const newComment = {
      rating: rating,
      comment: comment.trim(),
      recipeid: recipeId,
      id: user.id,
    };
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
              <div className="comments-header">

              <h2>Comments</h2>
              </div>

              {formattedComments?.map((comment) => (
                <Box key={comment.commentID} sx={{ mt: 2 }}>
                  <Typography variant="subtitle1"  sx={{ fontWeight: 'bold' }}>
                    {comment.username} - {comment.formattedTimestamp}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating value={comment.rating} precision={0.5} readOnly />
                  </Box>
                  <Typography variant="body1">{comment.comment}</Typography>
                </Box>
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
