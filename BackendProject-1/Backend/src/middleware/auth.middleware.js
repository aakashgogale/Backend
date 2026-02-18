const jwt = require("jsonwebtoken")

const identifyUser = (req, res, next)=>{

     const token = req.cookies.token // token use krte he user ko pehchane ke liye , ki ye user kon he 
    
        if(!token){
          return res.status(401).json({ 
            message:"Token not provided, Unathorized access"
          })
        }
    
      let decoded; 
    
      try{
         decoded = jwt.verify(token, process.env.JWT_SCERET) //VERIFY 
        } catch(err){
          return res.status(401).json({
            message: "user not Authorized"
          })
        }
        
        req.user = decoded
        
        next()
}

module.exports = identifyUser