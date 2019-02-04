"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/allmaps', (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.render('allmaps', { results });
      });
  });

  router.get('/createmaps', (req, res) => {
    res.render('createmap');
  });

  router.post('/createmaps', (req, res) => {
    knex
      .insert({ name: req.body["Map Name"], description: req.body["Map Description"] })
      .into('maps')
    res.render('user');
  });

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

