const keys = require("./config/keys"),
  path = require("path");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 8000;

// creating a session
const expressSession = require("express-session")({
  secret: keys.cookieSecret,
  resave: false,
  saveUninitialized: false
});

// parse application/x-www-form-urlencoded
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession);
app.use(express.static(path.join(__dirname, "public")));

//initialize mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//check connection to DB
const db = mongoose.connection;
db.once("open", _ => {
  console.log("Database connected:", keys.mongoURI);
});

db.on("error", err => {
  console.error("connection error:", err);
});

//importing mongoose schemas
const Question = require("./api/models/questionModel"),
  User = require("./api/models/userModel");

//initiallizing passport
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// passport-local authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//importing routes
var reqRoutes = require("./api/routes/questionRoutes"),
  userRoutes = require("./api/routes/userRoutes");

//registering the routes
reqRoutes(app);
userRoutes(app);

app.listen(port);

console.log("quora-training REST app has started on " + port);
