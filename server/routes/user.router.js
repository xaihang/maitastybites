const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Axios request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, email)
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, password, email])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


/**
 * GET - get user's profile image by user ID
 */
router.get("/profileimage/:id", (req, res) => {
  const userId = req.params.id;

  const queryText = `
    SELECT profileimage FROM "user" WHERE id = $1;
  `;

  pool
    .query(queryText, [userId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404);
      } else {
        const profileImage = result.rows[0].profileimage;
        res.send(profileImage);
      }
    })
    .catch((error) => {
      console.log("Error getting user's profile image:", error);
      res.sendStatus(500);
    });
});


// POST route to update a user's profile image by their user ID
router.post("/:id/profile-image", (req, res) => {
  const userId = req.params.id;
  const { profileImage } = req.body;

  const queryText = `
    UPDATE "user" 
    SET "profileimage" = $1
    WHERE "id" = $2;
  `;

  const queryValues = [profileImage, userId];

  pool
    .query(queryText, queryValues)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("Error updating user profile image:", error);
      res.sendStatus(500);
    });
});


module.exports = router;
