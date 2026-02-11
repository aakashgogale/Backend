
const { url } = require('inspector')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User name is already Exists"],
        unique: [true, "User name is required"]
    },
    email:{
        type: String,
        required: [true, 'User Email is already Exists'],
        unique: [true, "User Email is Required"]
    },
    password:{
        type: String,
        required :[true, "User password required"]
    },
    bio: String,
    profileImage:{
        type: String,
        default: 'https://ik.imagekit.io/pzil3aw0a/default-profile-picture-icon-high-resolution-high-resolution-default-profile-picture-icon-symbolizing-no-display-picture-360167031.webp'
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel