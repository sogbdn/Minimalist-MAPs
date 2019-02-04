"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  //Post to login to save a cookie
  router.get("/login/:id", (req, res) => {
    // req.session.user_id = req.params.id;

    knex
      .select('*')
      .from('users')
      .where({name: req.params.id})
      .then((results) => {
        if (results) {
          //checking if the results (user name) exists 
          req.session.user_id = results.id;
          req.session.user_name = results.name;
          res.status(200).send()
        } else {
          //insert into knex
          //insert into users the user name and set it from the form
          //look up documentation for insert 
          knex ('users')
            .insert({name: req.params.id})
            .then(results => { //results is the whole entery. the results of the query
              //user has been created, so must set the cookie 
              req.session.user_id = results.id;
              req.session.user_name = results.name;
              res.status(200).send()
            }) 
        } //maybe error
      });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
}
