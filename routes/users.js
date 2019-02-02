"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  //Post to login to save a cookie
  router.post("/login/:id", (req, res) => {
    req.session.user_id = request.params.id;
    knex // Select the maps of the user
      .select('*')
      .from('maps')
      .where('user' = user_id);

    res.redirect("/mymaps");
  });





  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });













  return router;
}
