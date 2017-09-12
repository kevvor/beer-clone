"use strict";

const express      = require('express');
const beersRoutes  = express.Router();

module.exports = function(db) {

  beersRoutes.get("/", function(req, res) {
    const mongo_response = {}
    const beers = db.get('beers')

    beers.find().then((docs) => {
      mongo_response.beers = docs
    }).then(() => {
      return res.json(mongo_response)
    }).catch((err) => {
      res.status(500).json({ error: err.message})
    })
  });

  // beersRoutes.post("/", function(req, res) {
  //   if (!req.body.text) {
  //     res.status(400).json({ error: 'invalid request: no data in POST body'});
  //     return;
  //   }

  //   DataHelpers.saveBeer(beer, (err) => {
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       res.json(beer);
  //     }
  //   });
  // });

  return beersRoutes;

}
