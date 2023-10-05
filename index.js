const express = require("express");
const app = express();
//Load Environment Variables
require("dotenv").config();
const mongoose = require("mongoose");
// import body-parser for validation
bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// import user from user.js model
const User = require("./model/user.js");
const bcrypt = require("bcrypt");
// import passportJS midlware
const passport = require("passport");
// import passport Js login local strategy
const LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");

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
app.use(passport.session());

// passport.use(new LocalStrategy({ usernameField: "username" }, LocalStrategy));

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
passport.use(
    ((username, password, done) => {
    console.log(username + "," + password);
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);
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

    console.log(user);
    await user.save();
    res.render("login");
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
