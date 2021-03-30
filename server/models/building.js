const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buildingSchema = new Schema({
    company: String,
    address: String,
}, { versionKey: false }); // no crear el parametro del versionado del esquema

module.exports = mongoose.model("Buildings", buildingSchema);