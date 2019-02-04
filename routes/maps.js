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

  router.get('/', (req, res) => {
    res.render('createmap');
  });

  router.post('/', (req, res) => {
    console.log(req.body);
    knex('maps')
      .insert({
        name: req.body.name,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng,
        zoom: req.body.zoom,
        user_id: req.body.user_id
      })
      .then(function(input){ //change veriable names
        console.log('donesql')
        res.render('user');
        console.log(input);
      })
      // .into('maps')
    
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

