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

// to check
router.get("/owner/:o_id", (request, response) => {
  const { o_id } = request.params;

  const statement = `SELECT prop.id, prop.title, prop.address, prop.rate, prop.description, prop.img, p.name, c.category 
                      FROM properties_tb AS prop
                      JOIN places_tb AS p ON prop.place_id = p.id 
                      JOIN categories_tb AS c ON prop.category_id = c.id
                      WHERE prop.user_id = ?;`;

  db.pool.execute(statement, [o_id], (error, result) => {
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

// to check
router.post("/add", (request, response) => {
  const {
    title,
    address,
    rate,
    description,
    img,
    place_id,
    category_id,
    user_id,
  } = request.body;

  const statement = `INSERT INTO properties_tb (title, address, rate, description, img, place_id, category_id, user_id) VALUES (?,?,?,?,?,?,?,?);`;

  db.pool.execute(
    statement,
    [title, address, rate, description, img, place_id, category_id, user_id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

module.exports = router;
