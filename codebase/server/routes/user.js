const express = require("express");
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");

const router = express.Router();

router.post("/register", (request, response) => {
  const { name, email, password, phone, address, role_id } = request.body;
  const statement = `INSERT INTO users_tb (name, email, password, phone, address, role_id) values (?, ?, ?, ?, ?, ?);`;
  const encryptedPassword = String(crypto.SHA256(password));
  db.pool.execute(
    statement,
    [name, email, encryptedPassword, phone, address, role_id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.post("/login", (request, response) => {
  const { email, password } = request.body;
  const statement = `select id, name, phone, address, role_id, is_deleted from users_tb where email = ? and password = ?`;
  const encryptedPassword = String(crypto.SHA256(password));
  db.pool.query(statement, [email, encryptedPassword], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else {
      if (users.length == 0) {
        response.send(utils.createErrorResult("user does not exist"));
      } else {
        const user = users[0];
        if (user.is_deleted) {
          response.send(utils.createErrorResult("your account is closed"));
        } else {
          // create the payload
          const payload = { id: user.id };
          const token = jwt.sign(payload, config.secret);
          const userData = {
            token,
            id: `${user["id"]}`,
            name: `${user["name"]}`,
          };
          response.send(utils.createSuccessResult(userData));
        }
      }
    }
  });
});

// get profile
router.get("/profile", (request, response) => {
  const user_id = request.userId;
  const statement = `SELECT id, name, email, phone, address FROM users_tb where id = ?;`;
  db.pool.execute(statement, [user_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// update profile
router.put("/update", (request, response) => {
  const user_id = request.userId;
  const { name, phone, address } = request.body;
  const statement = `update users_tb set name = ?, phone = ?, address = ? where id = ?`;
  db.pool.execute(
    statement,
    [name, phone, address, user_id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// user booking property
router.post("/property/book", (request, response) => {
  // from_date, to_date, user_id, property_id, status_id, bill
  const user_id = request.userId;
  const { from_date, to_date, property_id, status_id, bill } = request.body;
  const statement = `INSERT INTO bookings_tb (from_date, to_date, user_id, property_id, status_id, bill) VALUES (?,?,?,?,?,?);`;

  db.pool.execute(
    statement,
    [from_date, to_date, user_id, property_id, status_id, bill],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// review and rating
router.post("/property/review", (request, response) => {
  // property_id, review, rating
  const user_id = request.userId;
  const { property_id, review, rating } = request.body;
  const statement = `INSERT INTO reviews_tb (property_id, review, rating) VALUES (?,?,?);`;

  db.pool.execute(statement, [property_id, review, rating], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
