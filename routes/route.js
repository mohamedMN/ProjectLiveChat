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

passport.use(new LocalStrategy(authUser));
// to check if session of user is set
checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  next();
};
checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};




// to log out
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


// the main page
router.get("/", checkAuthenticated, (req, res) => {
  res.render("login");
});
// the login page 
router.get("/login",(req,res)=>{
  res.render('login')
} )
// the register page
router.get("/register", checkLoggedIn, (req, res) => {
  res.render("register");
});


// the dashboard page
router.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("dashboard");
});

//handle login
router.post("/login",  checkLoggedIn,
passport.authenticate("local", {
  successRedirect: "dashboard",
  failureRedirect: "login",
})
);
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
