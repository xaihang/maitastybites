const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET - get ALL recipes from database from all users:
 */

router.get("/userSavedRecipe/:id", (req, res) => {
  const userID = req.params.id; // Retrieve the user ID from the request parameter

  const queryText = `
    SELECT 
      r.*, 
      s."saveID" AS "saved"
    FROM 
      "recipe" r 
      JOIN "save" s ON r."recipeID" = s."recipeID"
    WHERE 
      s."id" = $1;
  `;

  pool
    .query(queryText, [userID])
    .then((result) => {
      const recipes = result.rows;
      res.send(recipes);
    })
    .catch((error) => {
      console.log("Error getting saved recipes:", error);
      res.sendStatus(500);
    });
});


router.get("/", (req, res) => {
  const userID = req.user?.id;
  const selectSaved = userID ? ', s."saveID" AS "saved"' : '';
  const selectCommented = userID ? ', c."commentID" AS "commented"' : '';
  const queryText = `
    SELECT 
      r.*, 
      u."id" AS "userID"
      ${selectSaved}
      ${selectCommented}
    FROM 
      "recipe" r 
      JOIN "user" u ON r."id" = u."id"
      ${userID ? 'LEFT JOIN "save" s ON r."recipeID" = s."recipeID" AND s."id" = $1' : ''}
      ${userID ? 'LEFT JOIN "comments" c ON r."recipeID" = c."recipeid" AND c."id" = $1' : ''}
    ORDER BY r."recipeID" DESC;
  `;

  const queryParams = userID ? [userID] : [];

  pool
    .query(queryText, queryParams)
    .then((result) => {
      const recipes = result.rows.map((recipe) => ({
        ...recipe,
      }));
      res.send(recipes);
    })
    .catch((error) => {
      console.log("Error getting recipes:", error);
      res.sendStatus(500);
    });
});

router.delete("/allSave/:saveID", (req, res) => {
  const saveID = req.params.saveID;
  const queryText = `DELETE FROM "save" WHERE "saveID" = $1;`;
  pool
    .query(queryText, [saveID])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error saving recipe:", error);
      res.sendStatus(500);
    });
});
router.get("/", (req, res) => {
  const userID = req.user.id;
  const queryText = `
    SELECT 
      r.*, 
      s."saveID" AS "saved", 
      c."commentID" AS "commented",
      u."id" AS "userID"
    FROM 
      "recipe" r 
      LEFT JOIN "save" s ON r."recipeID" = s."recipeID" AND s."id" = $1 
      LEFT JOIN "comments" c ON r."recipeID" = c."recipeid" AND c."id" = $1 
      JOIN "user" u ON r."id" = u."id"
    ORDER BY r."recipeID" DESC;
  `;

  pool
    .query(queryText, [userID])
    .then((result) => {
      const recipes = result.rows.map((recipe) => ({
        ...recipe,
      }));
      res.send(recipes);
    })
    .catch((error) => {
      console.log("Error getting recipes:", error);
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
  const userID = req.user?.id; // use optional chaining to check if req.user exists

  let queryText = `
    SELECT 
      r.*
    FROM 
      "recipe" r 
    WHERE r."recipeID" = $1;
  `;
  let queryParams = [recipeID];

  // add JOIN and userID check if userID is passed
  if (userID) {
    queryText = `
      SELECT 
        r.*, 
        s."saveID" AS "saved"
      FROM 
        "recipe" r 
        LEFT JOIN "save" s ON r."recipeID" = s."recipeID" AND s."id" = $1 
      WHERE r."recipeID" = $2;
    `;
    queryParams = [userID, recipeID];
  }

  pool
    .query(queryText, queryParams)
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404);
      } else {
        const recipe = result.rows[0];
        res.send(recipe);
      }
    })
    .catch((error) => {
      console.log("Error getting recipe by ID:", error);
      res.sendStatus(500);
    });
});
// router.get("/:id", (req, res) => {
//   const recipeID = req.params.id;
//   const userID = req.user.id; 
//   const queryText = `
//     SELECT 
//       r.*, 
//       s."saveID" AS "saved"
//     FROM 
//       "recipe" r 
//       LEFT JOIN "save" s ON r."recipeID" = s."recipeID" AND s."id" = $1 
//     WHERE r."recipeID" = $2;
//   `;

//   pool
//     .query(queryText, [userID, recipeID])
//     .then((result) => {
//       if (result.rows.length === 0) {
//         res.sendStatus(404);
//       } else {
//         const recipe = result.rows[0];
//         res.send(recipe);
//       }
//     })
//     .catch((error) => {
//       console.log("Error getting recipe by ID:", error);
//       res.sendStatus(500);
//     });
// });

/**
 * POST - add a new recipe to the database (user id)
 */
router.post("/", (req, res) => {
  const recipeData = req.body;
  const { recipename, description, ingredients, direction, url, userId } =
    recipeData;

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
// router.delete("/:id", (req, res) => {
//   const recipeId = req.params.id;
//   const queryText = `DELETE FROM "recipe" WHERE "recipeID" = $1;`;

//   pool
//     .query(queryText, [recipeId])
//     .then(() => res.sendStatus(204))
//     .catch((error) => {
//       console.log("Error deleting recipe from database", error);
//       res.sendStatus(500);
//     });
// });

// DELETE - delete comments for recipe and then delete recipe id by user
router.delete("/:id", (req, res) => {
  const recipeId = req.params.id;
  
  // Delete associated comments for the recipe
  const deleteCommentsQuery = `DELETE FROM "comments" WHERE "recipeid" = $1;`;
  pool.query(deleteCommentsQuery, [recipeId])
    .then(() => {
      // Delete the recipe after the comments have been deleted
      const deleteRecipeQuery = `DELETE FROM "recipe" WHERE "recipeID" = $1;`;
      pool.query(deleteRecipeQuery, [recipeId])
        .then(() => res.sendStatus(204))
        .catch((error) => {
          console.log("Error deleting recipe from database", error);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.log("Error deleting comments from database", error);
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
router.post("/allSave", (req, res) => {
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

module.exports = router;
