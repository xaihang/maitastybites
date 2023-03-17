const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET - get ALL recipes from database from all users:
 */
router.get("/", (req, res) => {
  const queryText = `
    SELECT * FROM "recipe" ORDER BY "id" DESC;
  `;

  pool
    .query(queryText)
    .then((result) => {
      console.log("resultall", result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error getting user recipes:", error);
      res.sendStatus(500);
    });
});

/**
 * GET - get user's recipes from database (user id)
 */
router.get("/user", (req, res) => {
  const userId = req.user.id;

  const queryText = `
    SELECT * FROM "recipe" WHERE id = $1;
  `;

  pool
    .query(queryText, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error getting user recipes:", error);
      res.sendStatus(500);
    });
});

// GET recipe by ID
router.get("/:id", (req, res) => {
  const recipeID = req.params.id;

  console.log("recipeID", recipeID);
  const queryText = `
    SELECT * FROM "recipe" WHERE "recipeID" = $1;
  `;

  pool
    .query(queryText, [recipeID])
    .then((result) => {
      console.log("GETSINGLE result.rows", result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error getting recipe by ID:", error);
      res.sendStatus(500);
    });
});

/**
 * POST - add a new recipe to the database (user id)
 */
router.post("/", (req, res) => {
  const recipeData = req.body;
  const { recipename, description, ingredients, direction, url, userId } =
    recipeData;

  console.log("userId", userId);
  console.log("recipeData", recipeData);
  const queryText = `
    INSERT INTO "recipe" (recipename, description, ingredients, direction, url, id)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;

  const queryValues = [
    recipename,
    description,
    ingredients,
    direction,
    url,
    userId,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Error adding recipe to database", err);
      res.sendStatus(500);
    });
});

/**
 * DELETE - recipe by id
 */
router.delete("/:id", (req, res) => {
  const recipeId = req.params.id;
  const queryText = `DELETE FROM "recipe" WHERE "recipeID" = $1;`;

  pool
    .query(queryText, [recipeId])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.log("Error deleting recipe from database", error);
      res.sendStatus(500);
    });
});

/**
 * PUT - edit a recipe by ID
 */
router.put("/:id", (req, res) => {
  const recipeID = req.params.id;
  const userId = req.user.id;
  const { recipename, description, ingredients, direction, url } = req.body;

  const queryText = `
    UPDATE "recipe" 
    SET "recipename" = $1, 
        "description" = $2, 
        "ingredients" = $3, 
        "direction" = $4, 
        "url" = $5 
    WHERE "recipeID" = $6 AND "id" = $7;
  `;

  const queryValues = [
    recipename,
    description,
    ingredients,
    direction,
    url,
    recipeID,
    userId,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("Error updating recipe:", error);
      res.sendStatus(500);
    });
});

// POST route to save a recipe to a user's account
router.post("/save", (req, res) => {
  const { id, recipeID } = req.body;
  const queryText = `INSERT INTO "save" ("id", "recipeID") VALUES ($1, $2) RETURNING *;`;
  pool
    .query(queryText, [id, recipeID])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error saving recipe:", error);
      res.sendStatus(500);
    });
});

// GET route to retrieve saved recipes by user ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const queryText = `SELECT * FROM "save" WHERE "id" = $1;`;
  pool
    .query(queryText, [id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error retrieving saved recipes:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
