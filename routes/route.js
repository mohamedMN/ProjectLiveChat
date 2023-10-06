const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");
const authUser = require("../controlles/passport-config");
const user = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const {register}= require("../controlles/controls");
//=====================
// ROUTES
//=====================
// the login page
// if user already connected
checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  next();
};
checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

router.get(
  "/login",
  checkLoggedIn,
  passport.authenticate("local", {
    successRedirect: "login",
    failureRedirect: "register",
  })
);

passport.use(new LocalStrategy(authUser));
// to check if session of user is set

// to log out
app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
  console.log(`-------> User Logged out`);
});

// the main page
router.get("/", checkAuthenticated, (req, res) => {
  res.render("register");
});

// the register page
router.get("/register", checkLoggedIn, (req, res) => {
  res.render("register");
});

// the layout page
router.get("/layout", (req, res) => {
  res.render("layout");
});
// the dashboard page
router.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("dashboard");
});

//handle login
router.post("/login", (req, res) => {});
// handling register form
router.post("/register", async (req, res) => {
  register(
    req.body.password,
    req.body.confirm_password,
    req.body.username,
    req.body.email
  );
});

//Handling user logout
router.get("/logout", (req, res) => {});

module.exports = router;
