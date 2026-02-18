
const Module = require("module")
const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    captions : {
        type : String,
        default : "",
    },
    imgUrl : {
        type: String,
        required : [true, "ImgUrl required for creating post."]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user id is required for creating post."]
    }
})

const postModel = mongoose.model("post", postSchema)

module.exports = postModel