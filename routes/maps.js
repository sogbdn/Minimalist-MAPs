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
    // see how find a new map with google map?
    res.redirect('page_with_newmap');
  });


  router.get('mymaps', (req, res) => {
    knex('maps')
      .join('users')
      .select('*')
      .where('maps.user_id' = 'users.id')
      .then((results) => {
        res.render('/mymaps.html');
      });

  })

};


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
