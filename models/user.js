const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
}, { versionKey: false }); // no crear el parametro del versionado del esquema

module.exports = mongoose.model("Users", userSchema);