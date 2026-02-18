const followModel = require("../models/follow.model")



async function followUserController(req, res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followeeUsername == followerUsername){
        return res.status(400).json({
            message : "You cannot follow yourSelf"
        })
    }

    const isFollowExists = await followModel.findOne({
        username : followeeUsername
    })

    if(!isFollowExists){
        res.status(400).json({
            message : "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollow = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername,
    })

    if(isAlreadyFollow){
        return res.status(200).json({
            message : "You are already following",
            follow : isAlreadyFollow
        })
    }

     const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(200).json({
        message : `You are now following`,
        followRecord
    })
}

async function unFollowUserController(req, res){

   const followerUsername = req.user.username
   const followeeUsername = req.params.username

   const isUserUnfollow = await followModel.findOne({
    follower : followerUsername,
    followee : followeeUsername
   })

   if(!isUserUnfollow){
     return res.status(400).json({
        message : "You are not following",
        isUserUnfollow,
     })
   }

   await followModel.findByIdAndDelete(isUserUnfollow._id)

   res.status(200).json({
      message : "You have unfollow"

   })
}

async function userRequestSend(req, res){
    try{
        const followerId = req.user._id
        const followeeId = req.params.toUserid
        
        const connectionRequest = new followModel({
            follower : followerId,
            followee : followeeId,
            status : "panding"
        })

        await connectionRequest.save()
        res.status(200).json({
            message : "Follow request sent!"
        })
    } catch (err){
        res.status(400).json({
            message: "Wron request"
        })
    }
}

async function userRequestReview(req, res){
    
    try{
        const {status, requestId} = req.params
    const loggedInUser = req.user._id

    const allowedStatus = ["accepted", "rejected"]
    if(!allowedStatus.includes(status)){
        return res.status(400).json({
            message : "Invalid status!"
        })
    }

    const request = await followModel.findOne({
        _id: requestId,
        followee: loggedInUser,
        status: "pending"
    })

    if(!request){
        return res.status(404).json({
            message : "Request not found"
        })
    }

    request.status = status
    await request.save()

    res.status(200).json({
        message : `Request ${status} successfully`,
        request
    })

} catch(err){
    
    res.status(400).send("Error:" + err.massage)
}
}

async function userReceivedPending(req, res){
    try{
        const loggedInUser = req.user._id

    const requests = await followModel.find({
        followee : loggedInUser,
        status : "pending"
    })
  } catch(err){
    res.status(400).send("Error:" + err.message)
    }
  }


module.exports = {
    followUserController,
    unFollowUserController,
    userRequestSend,
    userRequestReview,
    userReceivedPending
}