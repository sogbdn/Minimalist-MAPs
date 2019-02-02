"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/allmaps', (req, res) => {
    res.render('allmaps.html');
  });

  router.post('/allmaps/view', (req, res) => {

  });

  router.post('/allmaps/edit', (req, res) => {

  });






  router.get('/createmaps', (req, res) => {
    res.render('createmap.html');
  });

  router.post('/createmaps', (req, res) => {
    // see how find a new map with google map?
    res.redirect('page_with_newmap');
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
