const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

// http://localhost:4000/api/properties/all/Agra
router.get("/all/:city", (request, response) => {
  const { city } = request.params;
  const statement = `select pp.id, pp.title, pp.address, pp.rate, pp.description, pp.place_id, pp.category_id, pp.img, pl.name from properties_tb pp INNER JOIN places_tb pl ON pp.place_id = pl.id where pl.name = ?; `;

  db.pool.execute(statement, [city], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// http://localhost:4000/api/properties/Agra/3
router.get("/:city/:id", (request, response) => {
  const { city, id } = request.params;
  const statement = `select pp.id, pp.title, pp.address, pp.rate, pp.description, pp.place_id, pp.category_id, pp.img, pl.name from properties_tb pp INNER JOIN places_tb pl ON pp.place_id = pl.id where pl.name = ? and pp.id = ?; `;

  db.pool.execute(statement, [city, id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
