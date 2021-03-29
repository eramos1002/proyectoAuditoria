const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const auditSchema = new Schema({
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buildings",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }, //viene del esquema user
    auditDate: {
        type: Date,
        required: false,
        default: null,
    },
    answers: [{
        type: Boolean,
        required: false,
        default: null,
    }, ],
}, { timestamps: false, versionKey: false }); // no crear el parametro del versionado del esquema

module.exports = mongoose.model("Audits", auditSchema);