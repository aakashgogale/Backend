const { request } = require("http");

const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type: String,
        unique: [true, "With this email account already exists"],
    },
    password : String
})

const userModel = mongoose.model("ManagmentData", userSchema)

module.exports = userModel