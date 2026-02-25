const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model.js")


async function registerController (req, res){
    const {email, password, username, bio, profileImage} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            messgae: 'User already Exists'
        })
    }

    const hash = await bcrypt.hash(password, 10)// 10 ka mtlb he ki kitni ayer rahegi hashing krne ki rahegi

    const user = await userModel.create({
        email,
        username,
        bio,
        profileImage,
        password: hash
    })
    
    const token = jwt.sign({
        id : user._id,
        username: user.username
    },
    process.env.JWT_SCERET,
    { expiresIn: '1d' }
)
    res.cookie("token", token)

    res.status(200).json({
        message: "User Registered successfully",
        username: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage : user.profileImage
        },
    })
}

async function loginController (req, res){
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password) 

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Password Invaild"
        })
    }

    const token = jwt.sign(
        {id: user._id,
         username: user.username   
        },
        process.env.JWT_SCERET,
        {expiresIn: '1d'}
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User successefilly loggedIn",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
// EXORTS    
}

async function getMeController(req, res) {
    
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        user : {
            username : user.username,
            email : user.email,
            bio : user.bio,
            profile: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}