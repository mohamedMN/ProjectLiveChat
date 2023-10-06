const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

app.use(passport.initialize());
app.use(passport.session());
// const  authUser = async (username,password,done)=>{
//   const   data= await User.findOne({username : username })
//     if(§data){
//         return done(null,) //////   kamal had lkhadma

//     }
//   }
// passport.use(new LocalStrategy (authUser))

passport.serializeUser((userObj, done) => {
  done(null, userObj);
});
passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});

// module.exports = authUser;
