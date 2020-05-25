const keys = require("./config/keys"),
  path = require("path");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000;

// creating a session
const expressSession = require("express-session")({
  secret: keys.cookieSecret,
  resave: false,
  saveUninitialized: false
});

//enabling cors
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession);
app.use(express.static(path.join(__dirname, "../client/build")));

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
  User = require("./api/models/userModel"),
  Tag = require("./api/models/FilterTagModel");

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
