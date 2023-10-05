const app = require("express")();
const passport=require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const User = require ('../models/user')
const bcrypt = require('bcrypt');

// import body-parser for validation
bodyParser = require("body-parser")
//start cockie
app.use(cookieParser());
// initiale the passportJS
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))
// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));




printData = (req, res, next) => {
  console.log("\n==============================")
  console.log(`------------>  ${count++}`)

  console.log(`req.body.username -------> ${req.body.username}`) 
  console.log(`req.body.password -------> ${req.body.password}`)

  console.log(`\n req.session.passport -------> `)
  console.log(req.session.passport)

  console.log(`\n req.user -------> `) 
  console.log(req.user) 

  console.log("\n Session and Cookie")
  console.log(`req.session.id -------> ${req.session.id}`) 
  console.log(`req.session.cookie -------> `) 
  console.log(req.session.cookie) 

  console.log("===========================================\n")

  next()
}

app.use(printData)