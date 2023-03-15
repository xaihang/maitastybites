import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const RecipeCommentList = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Reviews
      </Typography>
      {/* <List dense>
        {comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Rating: ${comment.rating} stars`}
              secondary={comment.comment}
            />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
};

export default RecipeCommentList;
