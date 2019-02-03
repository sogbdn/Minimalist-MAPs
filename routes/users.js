"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  //Post to login to save a cookie
  router.get("/login/:id", (req, res) => {
    let name = req.body.username;
    if (name  === /*req.params.name*/) {
      res.redirect("/createmap.html");
    } else {
      knex  
      .insert({name: userName})
      .into ('users')
      res.redirect('/createmap')
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });



  return router;
}
