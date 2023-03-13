const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET - get user's recipes from database 
 */
router.get('/', (req, res) => {
  const userId = req.user.id;

  const queryText = `
    SELECT * FROM "recipe" WHERE id = $1;
  `;


  pool.query(queryText, [userId])
    .then((result) => {
      console.log('result===', result.rows)
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error getting user recipes:', error);
      res.sendStatus(500);
    });
});

/**
 * POST - add a new recipe to the database
 */
router.post('/', (req, res) => {
  const recipeData = req.body;
  const { recipename, description, ingredients, direction, url, userId } = recipeData;

  console.log('userId', userId)
  console.log('recipeData', recipeData)
  const queryText = `
    INSERT INTO "recipe" (recipename, description, ingredients, direction, url, id)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;

  const queryValues = [recipename, description, ingredients, direction, url, userId];

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
