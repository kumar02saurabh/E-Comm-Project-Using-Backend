const user_model= require("../models/user.model")
const jwt =require("jsonwebtoken")
const auth_config =require("../configs/auth.config")

/**
 * Create a MW will check if the rquest body is proper and correct 
 */

const verifySignupBody = async (req,res,next)=>{
    try{
        //Check for the Name 
        if(!req.body.name){
            return res.status(400).send({
                message:"Failed ! Name was not provided in request body  "
            })
        }

        // Check for the email
        if(!req.body.email){
            return res.status(400).send({
                message:"Failed ! email was not provided in request body  "
            })
        }
        // check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message:"Failed ! userID was not provided in request body  "
            })
        }
        // check if the user with the same userId is allready present  
        const user =await user_model.findOne({userId:req.body.userId})

         if (user){
            return res.status(400).send({
                message:"Failed ! user with the same userId is allready present   "
            })
        }
        
        next()

    } catch(err){
        console.log("Error While Validating the requset object ",err)
    res.status(500).send({
        message:"Error While Validating the requset object"
    })
    }
}
const verifySigninBody = async (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message:"UserId is Not Provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message:"Password is Not Provided"
        })
}
next()
}

// Verify token 
const verifyToken =(req,res)=>{
    // Check if token present in the haeder

    const token =req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message :"No Token found : Unauthorized "
        })
    }
    // If it's a valid Token
    
    jwt.verify(token,auth_config.secret, async (err,decode)=>{
        if(err){
            return res.status(401).send9({
                message:"Unauthorized"
            })
        }
        const user=await user_model.findOne({userId : decode.id})
        if (!user){
            return res.status(400).send({
                message:"Unauthorized ,this userfor this token doesn't exist"
            })
        }
        // Then Move to the next step

        // set the user info in the req body 
        req.user= user
        next()
    })
   
     

}

const isAdmin= (req,res,next)=>{
    const user= req.user
    if(user&& user.userType=="ADMIN"){
        next()
    }else {
        return res.status(403).send ({
            message :"Only ADMIN User Are allowed to access This endpoint "
        })
    }

    }



module.exports={
    verifySignupBody:verifySignupBody,
    verifySigninBody:verifySigninBody,
    verifyToken: verifyToken,
    isAdmin:isAdmin
}