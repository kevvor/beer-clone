"use strict";

const express      = require('express');
const beersRoutes  = express.Router();

module.exports = function(db) {

  const beers = db.get('beers')
  const template_vars = {}

  beersRoutes.get("/", function(req, res) {
    // const beers = db.get('beers')

    beers.find().then((docs) => {
      console.log(docs)
      template_vars.beers = docs
    }).then(() => {
      res.render("beers_index", template_vars)
    }).catch((err) => {
      res.status(500).json({ error: err.message })
    })
  });

  beersRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    beers.insertOne({
      'name': req.body.text.name,
      'style': req.body.text.style,
      'rating': req.body.text.rating,
      'ABV': req.body.text.ABV,
      'brewery': req.body.text.brewery,
      'description': req.body.text.description
    }).then(() => {
      return db.close()
    }).catch((err) => {
      res.status(500).json({ error: err.message })
    })
  });

  beersRoutes.get("/:beer", (req, res) => {
    // const beers = db.get('beers')

    beers.findOne({ db_id: req.params.beer }).then((doc) => {
      template_vars.beer = doc
    }).then(() => {
      res.render("show_beer", template_vars)
    }).catch((err) => {
      res.status(500).json({ error: err.message })
    })
  })

  return beersRoutes;

}


