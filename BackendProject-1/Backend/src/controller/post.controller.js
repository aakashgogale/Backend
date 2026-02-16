const postModel = require("../models/post.model")
const ImageKit = require ('@imagekit/nodejs');
const {toFile} = require("@imagekit/nodejs");
const  verify  = require("crypto");
const jwt = require("jsonwebtoken");
const  Captions  = require("lucide-react");


const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function postCreatController(req, res){
    console.log(req.body, req.file);

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
  console.log(decoded)
    

const file = await imageKit.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'Test',
  folder : "cohort-instagramClone"
})

const post = await postModel.create({
            Captions: req.body.Captions,
            imgUrl: file.url,
            user: decoded.id
        })

  res.status(201).json({
    message: "Post created successfully",
    post
  })
}

async function getPostController(req, res){

   const token = req.cookies.token

   if(!token){
    return res.status(401).json({
      message : "Token Invalid"
    })
   }

   let decoded = null
   try{

     decoded = jwt.verify(token, process.env.JWT_SCERET)

   } catch(err) {

    return res.status(401).json({
      message: "Token Invaild"

    })

   }
   const userId = decoded.id
   const posts = await postModel.find({
    user : userId

  })

   res.status(200).json({
    message: "Post fetched successfully",
    posts
   })
}

async function getPostDetailsController(req, res){

  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message: "Unathorized Access"
    })
  }

  let decoded;

  try{
    decoded = jwt.verify(token, process.env.JWT_SCERET)
  }catch(err){
    return res.status(404).json({
      message: "Token Invaild"
    })
  }

  const userId = decoded.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message : "Post not found"
    })
  }

  const isValidUser = post.user.toString() === userId

  if(!isValidUser){
    return res.status(403).json({
      message : "forbidden contant"
    })
  }

  res.status(200).json({
    message: " post fetched successfully",
    post
  })

}

module.exports = {
    postCreatController,
    getPostController,
    getPostDetailsController
}