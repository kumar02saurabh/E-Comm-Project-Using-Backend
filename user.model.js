const mongoose =require("mongoose") 

/**
 * name 
 * userid
 * password
 * email
 * userType
 */
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minLength:10,
        unique:true

    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN"]

    }
   
},{timestamps:true,versionKey:false})
mongoose.model("User",userSchema)
module.exports= mongoose.model("user",userSchema)