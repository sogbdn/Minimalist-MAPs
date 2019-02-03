"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  //Post to login to save a cookie
  router.post("/login/:id", (request, response) => {
    request.session.user_id = request.params.id;
    response.redirect("/createmap.html");
  });







  return router;
}
