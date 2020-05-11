var keys = require("./config/keys"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  Question = require('./api/models/questionModel'); //created model loading here

//initialize mongoose
mongoose.Promise = global.Promise;
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);



const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


var routes = require("./api/routes/questionRoutes"); //inporting route
routes(app); //register the route


app.listen(port);

console.log("quora-training REST app has started on " + port);
