const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authUser = async (username, password, done) => {
  console.log(username +"     psw : "+password)
  const data = await User.findOne({ username: username });
  if (!data)
    return done(null, false, {
      message: "Cannot find user with that username",
    });
  try {
    const checkPassword = await bcrypt.compare(password, data.password);
    if (!checkPassword)
      return done(null, false, { message: "Incorrect password" });
    if (data) done(null, data);
  } catch (err) {
    return console.log(err);
  }
};


passport.serializeUser((userObj, done) => {
  done(null, userObj);
});
passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});

module.exports = authUser;
