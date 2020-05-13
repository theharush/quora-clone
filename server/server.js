const keys = require("./config/keys"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require('path'),
  Question = require('./api/models/questionModel'),
  User = require('./api/models/userModel');


const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
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

//middleware for authenticating requests.
app.use(function (req, res, next) {
  User.findOne({ Key: req.headers.key }, function (err, user) {
    if (user)
      next();
    else
      res.send("srry not srry");
  })
})

//importing routes
var reqRoutes = require("./api/routes/questionRoutes");
//registering the routes
reqRoutes(app);

app.listen(port);

console.log("quora-training REST app has started on " + port);
