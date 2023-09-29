const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
//user model
const User = require('./User')
// connect to the datbase
mongoose.connect('mongodb://localhost/testdb')
                

//This tells Express to serve any files from the 'public' folder. 
app.use(express.static('public'));

// Définir le moteur de vues EJS
app.set('view engine', 'ejs');

// Définir le répertoire des vues
app.set('views', './views'); 


// the main page
app.get('/',(req,res)=>{
    res.send('this is the main page !');
})

// the register page
app.get('/register',(req,res)=>{
    res.render('register');

})
// the login page 
app.get('/login',(req,res)=>{
    res.render('login');

})
// the layout page 
app.get('/layout',(req,res)=>{
    res.render('layout');

})
// the dashboard page 
app.get('/dashboard',(req,res)=>{
    res.render('dashboard');

})

// start of the serveur
app.listen(PORT,()=>{
    console.log("Server don start  http://localhost:"+PORT);
} )