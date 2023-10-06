const express = require("express");
const app = express();
const routes = require("./routes/route");
const mongoose = require("mongoose");
const passport = require("passport");
const user = require("./models/user");
const middleware = require("./middleware/middlware");
//Load Environment Variables
require("dotenv").config();
//This tells Express to serve any files from the 'public' folder.
app.use(express.static("public"));
// Définir le moteur de vues EJS
app.set("view engine", "ejs");
// Définir la répertoire des vues
app.set("views", "./views");
// call the routes in route folder
app.use(middleware, routes);
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

// start of the serveur
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log("Server on start  http://localhost:" + PORT);
});
