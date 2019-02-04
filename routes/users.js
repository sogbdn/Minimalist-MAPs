"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  //Post to login to save a cookie
  router.post("/login/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect("/createmap");
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
}
