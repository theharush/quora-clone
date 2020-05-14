const keys = require("./config/keys"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require('path'),
  cookieParser = require("cookie-parser"),
  session = require("cookie-session"),
  Question = require('./api/models/questionModel'),
  User = require('./api/models/userModel');


const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//handkeing cookies
app.use(cookieParser());
app.use(session({
  name: 'session',
  keys: ['key1', 'key2']
}))

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
app.use('/api', function (req, res, next) {
  // req.session = null;
  if (req.session && req.session.user)
    next();

  else
    res.sendStatus(403);
});

//importing routes
var reqRoutes = require("./api/routes/questionRoutes"),
  userRoutes = require("./api/routes/userRoutes");
//registering the routes
reqRoutes(app);
userRoutes(app);


app.listen(port);

console.log("quora-training REST app has started on " + port);
