const express = require("express");
const app = express();
//Load Environment Variables
require("dotenv").config();
const mongoose = require("mongoose");
// import passportJS midlware
passport = require("passport");
// import body-parser for validation
bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//import for local authentification
LocalStrategy = require("passport-local");
passportLocalMongoose = require("passport-local-mongoose");
// import user from user.js model
const User = require("./models/user.js");
// url connection to db  from .env
const url = process.env.MONGOLAB_URI;

//connection function

async function connection() {
  try {
    await mongoose.connect(url);
    console.log("connected to db");
  } catch (err) {
    console.error(err);
  }
}
//call up conncetion function
connection();

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "niswith",
    resave: false,
    saveUninitialized: false,
  })
);
//start cockie
app.use(cookieParser());

// initiale the passportJS
app.use(passport.initialize());
// initiale the session
app.use(passport.session());

// define localStartegie for sign up
passport.use(new LocalStrategy(User.authenticate()));
//  Passport should serialize user objects
passport.serializeUser(User.serializeUser());
//  Passport should deserializable user objects
passport.deserializeUser(User.deserializeUser());

//This tells Express to serve any files from the 'public' folder.
app.use(express.static("public"));

// Définir le moteur de vues EJS
app.set("view engine", "ejs");

// Définir le répertoire des vues
app.set("views", "./views");

//=====================
// ROUTES
//=====================
// the main page
app.get("/", (req, res) => {
  res.render("register");
});

// the register page
app.get("/register", (req, res) => {
  res.render("register");
});
// the login page
app.get("/login", (req, res) => {
  res.render("login");
});
// the layout page
app.get("/layout", (req, res) => {
  res.render("layout");
});
// the dashboard page
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
//Handling user login
app.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        res.render("dashboard");
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
// handling register form
app.post("/register", async (req, res) => {
  const pass = req.body.password;
  const conPass = req.body.confirm_password;
  if (pass === conPass) {
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // replace plain text password with hashed password
    let password = hashedPassword;
    const user = new User({
      username: req.body.username,
      password: password,
      email: req.body.email,
    });
    await user.save();
  } else {
    return res.status(404).json({ message: "no matching in password" });
  }
});

//Handling user logout
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// start of the serveur
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log("Server on start  http://localhost:" + PORT);
});
