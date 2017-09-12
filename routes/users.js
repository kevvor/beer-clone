"use strict";

const express = require('express');
const router  = express.Router();

module.exports = () => {

  router.get("/", (req, res) => {


      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
