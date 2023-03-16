const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Route to add a new comment and rating to the comments table
router.post("/", async (req, res) => {
  const { recipeid, comment, rating, id } = req.body;


  try {
    const result = await pool.query(
      `INSERT INTO "comments" (recipeid, comment, rating, id) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [Number(recipeid), comment, rating, id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the comment." });
  }
});

// Route to get all comments and ratings for a recipe
router.get("/:recipeid", async (req, res) => {
  console.log('req.params', req.params)
  const { recipeid } = req.params;

  if (!recipeid) {
    return res.status(400).json({ error: "Missing recipeid parameter" });
  }

  try {
    const result = await pool.query(
      `SELECT c.*, u.username FROM "comments" c JOIN "user" u ON u.id = c.id WHERE c.recipeid = $1;`,
      [parseInt(recipeid)]
    );
    console.log('result', result)
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching comments." });
  }
});

module.exports = router;
