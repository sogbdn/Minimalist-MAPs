"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/allmaps', (req, res) => {
    res.render('allmaps.html');
  });



  router.get('/createmaps', (req, res) => {
    res.render('createmap');
  });





  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
      });
  });

  return router;
}
