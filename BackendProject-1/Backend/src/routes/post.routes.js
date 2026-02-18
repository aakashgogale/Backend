
const express = require("express")
const postConteroller = require("../controller/post.controller")
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage()})
const identifyUser = require("../middleware/auth.middleware")

const postRoutes = express.Router()

postRoutes.post("/",upload.single("image"), identifyUser ,postConteroller.postCreatController)

postRoutes.get("/", identifyUser  ,postConteroller.getPostController)

postRoutes.get("/details/:postId",identifyUser, postConteroller.getPostDetailsController)

postRoutes.post("/like/:postId", identifyUser, postConteroller.likePostController)

module.exports = postRoutes