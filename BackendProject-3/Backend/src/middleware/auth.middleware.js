
const userModel = require("../models/user.model")
const blacklistModel = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

async function authUser(req, res, next){

    const token = req.cookies.token
    if(!token){
        res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenBlacklisted = await redis.get(token)

    try{
        const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY,
        )

        req.user = decoded
        next()
    }
    catch (err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = { authUser }