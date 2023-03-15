
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Route to add a new comment and rating to the comments table
router.post('/comments', async (req, res) => {
    const { recipeID, id, comment, rating } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO comments (recipeID, id, comment, rating) VALUES ($1, $2, $3, $4) RETURNING *',
        [recipeID, id, comment, rating]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the comment.' });
    }
  });
  
  // Route to get all comments and ratings for a recipe
  router.get('/comments/:recipeID', async (req, res) => {
    const { recipeID } = req.params;
  
    try {
      const result = await pool.query(
        'SELECT * FROM comments WHERE recipeID = $1',
        [recipeID]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching comments.' });
    }
  });
  
  module.exports = router;
  