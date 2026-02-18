const express = require("express")
const followModel = require("../models/follow.model")
const userRouter = express.Router()
const identifyUser = require("../middleware/auth.middleware")
const userController = require("../controller/user.controller")


userRouter.post("/follow/:username", identifyUser, userController.followUserController)
userRouter.post("/unfollow/:username", identifyUser, userController.unFollowUserController)
userRouter.post("/request/:requestId", identifyUser, userController.userRequestSend)
userRouter.patch("/request/review/:status/:requestId", identifyUser, userController.userRequestReview)
userRouter.get("/request/received/pending", identifyUser, userController.userReceivedPending)
module.exports = userRouter