const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

// book the property
router.post("/book", (request, response) => {
  const { from_date, to_date, user_id, property_id, bill } = request.body;
  const statement = `INSERT INTO bookings_tb (from_date, to_date, user_id, property_id, bill) values (?, ?, ?, ?, ?);`;
  db.pool.execute(
    statement,
    [from_date, to_date, user_id, property_id, bill],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// get users bookings
router.get("/bookings/:id", (request, response) => {
  const { id } = request.params;
  const statement = `SELECT b.from_date, b.to_date, b.bill, s.status, p.title 
                      FROM bookings_tb AS b
                      INNER JOIN booking_status_tb AS s ON b.status_id = s.id
                      INNER JOIN properties_tb AS p ON b.property_id = p.id
                      INNER JOIN users_tb AS u ON b.user_id = u.id
                      WHERE u.id = ?;`;

  db.pool.execute(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
