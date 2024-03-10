// I need to write the controller /logic to register a user

const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret =require("../configs/auth.config")
exports.signup = async (req,res)=>{
    /**
     * logic to create user
     */
    //1.Read the request body 

    const request_body=req.body

    // 2. Insert The data in the user colections in mongoDB
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
    }
    try{
        const user_created =await user_model.create (userObj)

        /**
         * Return The user 
         */
// In this WE only Pass these details to secure Password 
        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }

        res.status(201).send(res_obj)

    }catch(err){
        console.log("Error while registering the user ")
        res.status(500).send({
            message:"Some error while regestering the user "
        })
    }
    //3. Return the response back to the user 

}
            // For Login
exports.signin= async (req,res)=>{
    // check if the user id is Present in the system
    const user = await user_model.findOne({userId:req.body.userId})

    if(user==null){
        return res.status(400).send({
            message:"User id Is Passed is not a valid user id "
        })
    }

    // Password is correct
    
    const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
    if(! isPasswordValid){
        return res.status(401).send({
            message:"Wrong Password Passed "
        })
    }

    //using JWT we will create the access token with a given TTL and return  

    const token = jwt.sign({id:user.userId},secret.secret,{
        expiresIn : 120  // 120 is in Seconds
    })
    res.status(200).send({
        name:user.name,
        userId: user.userId,
        email:user.email,
        userType: user.userType,
        accessToken:token
    })
}


