const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
});
userSchema.plugin(passportLocalMongoose);

const collection = mongoose.model("User", userSchema);
module.exports = collection;
