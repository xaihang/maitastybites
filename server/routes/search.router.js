const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET - search recipes by recipe name
 */
router.get("/", (req, res) => {
    const searchTerm = req.query.query;
    const queryText = `
      SELECT * FROM "recipe" WHERE "recipename" ILIKE '%' || $1 || '%';
    `;
  
    pool
      .query(queryText, [searchTerm])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error searching for recipes:", error);
        res.sendStatus(500);
      });
  });

module.exports = router;
