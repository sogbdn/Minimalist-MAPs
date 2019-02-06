"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.post("/:id", (req, res) => {
    const markerId = req.params.id;
    const markerName = req.body.name;
    const markerAddress = req.body.description;
    knex('markers')
      .where({ id: markerId })
      .update({ name: markerName, address: markerAddress })
      .then(function (result) {
        console.log(result)
        res.sendStatus(200)
      })
  });

  return router;
}
