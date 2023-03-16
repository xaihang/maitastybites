const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET - search recipes by recipe name
 */
router.get("/search", (req, res) => {
    const searchQuery = req.query.q;
    const queryText = `
      SELECT * FROM "recipe" WHERE "recipename" ILIKE '%' || $1 || '%';
    `;
  
    pool
      .query(queryText, [searchQuery])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error searching for recipes:", error);
        res.sendStatus(500);
      });
  });

module.exports = router;
