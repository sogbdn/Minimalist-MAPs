"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  //Post to login to save a cookie
  router.post("/login", (req, res) => {
    // req.session.user_id = req.params.id;

    const loginName = req.body.loginName;
    //retrieve the user with this name in the database and return
    //its id

    knex
      .select('*')
      .from('users')
      .where({ name: loginName })
      .then((results) => {
        if (results.length !== 0) {
          //checking if the results (user name) exists 
          console.log('Results: ', results);
          req.session.user_id = results[0].id;
          req.session.user_name = results[0].name;
          res.redirect(`/api/maps/users/${results[0].id}/`); //change to myMaps?

        } else {
          //insert into knex
          //insert into users the user name and set it from the form
          //look up documentation for insert 
          console.log(loginName);
          knex('users')
            .insert({ name: loginName })
            .returning('id')
            .then((id) => { //results is the whole entery. the results of the query
              //user has been created, so must set the cookie 
              console.log('Insert Id: ', id);
              req.session.user_id = id[0];
              req.session.user_name = loginName;
              res.redirect("/api/maps/");
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
