"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/allmaps', (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
      });
    res.render('allmaps.html');
  });

  router.get('/createmaps', (req, res) => {
    res.render('createmap.html');
  });

  router.post('/createmaps', (req, res) => {
    knex
      .insert({ name: 'test_name' })
      .into('maps')
    res.render('user.ejs');
  });

  router.get('mymaps', (req, res) => {
    knex('maps')
      .join('users')
      .select('*')
      .where(user_id = id)
      .then((results) => {
        res.render('/mymaps.html');
      });

  })

return router;
}
