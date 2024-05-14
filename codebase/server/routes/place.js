const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

// show all available places to user
router.get("/all", (request, response)=>{
    const statement = `SELECT id, name FROM places_tb;`

    db.pool.execute(statement, (error, result)=>{
        response.send(utils.createResult(error, result));
    })
})

module.exports = router;