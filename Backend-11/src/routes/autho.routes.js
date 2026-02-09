
const express = require('express')
const userModel = require("../models/userData.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")

// Create api For the first user Registretion in web 
// POST APIs

authRouter.post("/register", async (req, res)=>{
    const {email, name, password} = req.body
// ager user ek email se register he or usi email se dusra account create krna cahh rha he mtln 1 he or usi email aw 1 or acount to is situ..me
    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists this email adress"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
            email,
            name,
            password: hash,
    })

    const token = jwt.sign(
        {
        id : user._id,
        email : user._email,
        },
        process.env.JWT_SCERET
)

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User account created successfully",
        user,
        token
    })
})

// api/auth/protected
authRouter.post("/protected", (req, res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message: "This is a protected route"
    })
})

// mathod - POST -> api/auth/login -> Controller

authRouter.post("/login", async (req, res)=>{
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message: "User not found with this email adress"
        })
    }
// ager password sahi nahi he to ye condition run hogi
    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")
        if(!isPasswordMatched){
            return res.status(401).json({
                message: 'Invelid password'
            })
        }
// ager password sahi he to ye condition chalegi
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SCERET)

        res.cookie("jwt_token", token)

        res.status(200).json({
            message: "User logged in",
            user
        })
    })


module.exports = authRouter