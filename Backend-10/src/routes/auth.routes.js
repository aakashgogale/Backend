
const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()

authRouter.post("/register", async (req, res)=>{
    const {name, email, password} = req.body
// for this method check "user already us mail se loging ya acoun create kr ke rkha he to us hi mail se dusra acoun create nahi hoga
// "
    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists with this email address"
        })
    }
    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email,
    },
    process.env.JWT_SECRET
)

    res.cookie("jwt_token", token) // Cookie-parser  - Cookie-storage
    

    res.status(201).json({
        message: 'Account Created Successfully',
        user,
        token
    })

})

module.exports = authRouter 