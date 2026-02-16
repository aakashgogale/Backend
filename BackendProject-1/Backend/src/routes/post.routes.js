
const express = require("express")
const postConteroller = require("../controller/post.controller")
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage()})

const postRoutes = express.Router()

postRoutes.post("/",upload.single("image") ,postConteroller.postCreatController)

postRoutes.get("/",postConteroller.getPostController)

postRoutes.get("/details/:postId", postConteroller.getPostDetailsController)

module.exports = postRoutes