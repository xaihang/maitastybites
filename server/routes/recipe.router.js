const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST 
 */
router.post('/', (req, res) => {
  const recipeData = req.body;
  const { title, ingredients, directions, url, userId } = recipeData;

  const queryText = `
    INSERT INTO "recipe" (title, ingredients, directions, url, id)
    VALUES ($1, $2, $3, $4, $5);
  `;

  const queryValues = [title, ingredients, directions, url, userId];

  pool.query(queryText, queryValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error adding recipe to database', err);
      res.sendStatus(500);
    });
});

/**
 * DELETE - route here:
 */



/**
 * PUT - route here: 
 */


module.exports = router;
