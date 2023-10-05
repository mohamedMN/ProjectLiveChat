const express= require("express");
const app =express();
const router = express.Router();
const passport=require('passport')
const authUser = require('../controlles/passport-config')
authUser(passport)
const user = require ('../models/user')
//=====================
// ROUTES
//=====================


// to check if session of user is set
checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())  return next() 
  res.redirect("/login")
}
// if user already connected
checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/dashboard")
  next()
}
// to log out
app.delete("/logout", (req,res) => {
  req.logOut()
  res.redirect("/login")
  console.log(`-------> User Logged out`)
})


// the main page
router.get("/",checkAuthenticated, (req, res) => {
    res.render("register");
  });
  
  // the register page
  router.get("/register",checkLoggedIn, (req, res) => {
    res.render("register");
  });
  // the login page
  router.get("/login",checkLoggedIn, passport.authenticate('local', {
    successRedirect: "login",
    failureRedirect: "register",
 }));
  
  
  // the layout page
  router.get("/layout", (req, res) => {
    res.render("layout");
  });
  // the dashboard page
  router.get("/dashboard",checkAuthenticated, (req, res) => {
    res.render("dashboard");
  });


  module.exports= router 