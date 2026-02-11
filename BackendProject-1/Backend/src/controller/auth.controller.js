const crypto = require('crypto')
const jwt = require('jsonwebtoken')
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

    const hash = crypto.createHash('sha256').update(password).digest('hes')

    const user = await userModel.create({
        email,
        username,
        bio,
        profileImage,
        password: hash
    })
    
    const token = jwt.sign({
        id : user._id
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

    const hash = crypto.createHash('sha256').update(password).digest('hes')

    const isPasswordValid = hash == user.password

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Password Invaild"
        })
    }

    const token = jwt.sign(
        {id: user._id},
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
}

module.exports = {
    registerController,
    loginController
}