const keys = require("./config/keys"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require('path'),
  Question = require('./api/models/questionModel');


const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//initialize mongoose
mongoose.Promise = global.Promise;
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//check connection to DB
const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected:', keys.mongoURI)
})

db.on('error', err => {
  console.error('connection error:', err)
})

//enabling cors.
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

//importing routes
var reqRoutes = require("./api/routes/questionRoutes");
//registering the routes
reqRoutes(app);

app.listen(port);

console.log("quora-training REST app has started on " + port);
