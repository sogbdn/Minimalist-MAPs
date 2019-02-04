"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/allmaps', (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results)
        // template to allmaps.ejs
      });
    res.render('allmaps');
  })

  router.get('/createmaps', (req, res) => {
    res.render('createmap');
  })

  router.post('/createmaps', (req, res) => {
    knex
      .insert({ name: req.body["Map Name"], description: req.body["Map Description"] })
      .into("maps")
    res.redirect('mymaps');
  })

  // ajax route
  router.post('createmarker', (req, res) => {
    // ckeck if user logged in?
    // check if map is owned by user?
    // add marker to map id.
    knex
      .insert({ name: req.body["Map Name"], description: req.body["Map Description"] })
      .into("marker");
  })



  router.get('/mymaps', (req, res) => {
    knex('maps')
      .join('users')
      .select('*')
      .where(user_id = id)
      .then((results) => {
        res.render('mymaps');
      });
  })
  return router;
}
