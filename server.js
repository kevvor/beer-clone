"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const morgan      = require('morgan');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

//Establish db connection
const db_name = 'beer_clone'
const mongo = require('mongodb')
const monk = require('monk')
const db = monk(`localhost:27017/${db_name}`)
db.then(() => {
  console.log(`Connected to db: ${db_name}`)

// Load route helpers
  // const DataHelpers = require("./lib/data-helpers")(db)

  // console.log('data-helpers', DataHelpers)
  // console.log('db', db)
  // console.log('this', this)

// Seperated Routes for each Resource
  const beersRoutes = require("./routes/beers")(db)
  const usersRoutes = require("./routes/users")(db)

// Mount all resource routes
  app.use("/beers", beersRoutes)

// Home page
  app.get("/", (req, res) => {
    res.render("index");
});

})



app.listen(PORT, () => {
  console.log("beer_clone listening on port " + PORT);
});
