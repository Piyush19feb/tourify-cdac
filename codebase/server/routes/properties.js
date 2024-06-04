const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

// select * from properties_tb pp INNER JOIN places_tb pl ON pp.place_id = pl.id where pl.name = "Agra";
router.get("/all/:city", (request, response) => {
  const { city } = request.params;
  const statement = `select * from properties_tb pp INNER JOIN places_tb pl ON pp.place_id = pl.id where pl.name = ?; `;

  db.pool.execute(statement, [city], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
