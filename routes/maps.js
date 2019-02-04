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

  router.get('/api/maps', (req, res) => {
    res.render('createmap');
  });

  router.post('/api/maps', (req, res) => {
    console.log(req.body);
    knex
      .insert({
        name: req.body.name,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng,
        zoom: req.body.zoom,
        user_id: req.body.user_id
      })
      .into('maps')
    res.render('user');
  });

  router.get('/mymaps', (req, res) => {
    knex('maps')
      .join('users')
      .select('*')
      .where(user_id = id)
      .then((results) => {
        res.render('mymaps', { results });
      });
  })

  return router;
}

