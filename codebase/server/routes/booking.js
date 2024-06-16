const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.post("/property", (request, response) => {
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

module.exports = router;
