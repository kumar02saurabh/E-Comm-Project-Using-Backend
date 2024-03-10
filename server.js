/**
 * This is the starting   file of the projects
 */

const express= require("express")
const mongoose=require("mongoose")
const app=express()
const server_config=require("./configs/server.config")
const db_config=require("./configs/db.config")
const user_model =require("./models/user.model")
const bcrypt =require("bcryptjs")

app.use(express.json()) // Convert JSON into JS object i.e Middle ware 

/**
 * Connection with MongoDb 
 * 
 */

mongoose.connect(db_config.DB_URL)
const db= mongoose.connection
db.on("error",()=>{
    console.log('Error While Connected to MongoDB')
})
db.once("open",()=>{
    console.log("Connected To MongoDB")
    init()
})

async function init (){

    try{
        let  user= await user_model.findOne({userId:"admin"})
    
        if (user){
           console.log("Admin is already present ")
           return
    }

    }catch(err){
        console.log("Error While reading the data",err)
    }
   
    try{
        user= await user_model.create({
            name:" Saurabh Kumar ",
            userId:"admin",
            email:"saurabhkumar@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin Created ",user)


    }catch(err){
        console.log("Error while creating Admin",err)
    }

}
/**
 * Stich the routes to the server
 */
require("./Routes/auth.routes")(app)

require("./Routes/category.routes")(app)




/**
 * Start the server
 */

app.listen(server_config.PORT,()=>{
    console.log("Server Started at port num:",server_config.PORT)
   
})