/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need To intercept this
 */
const authController=require ("../Controllers//auth.controller")
const authMW= require("../Middleware/auth.MW")

module.exports =(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignupBody],authController.signup)


/**
 * routes for POST localhost:8888/ecomm/api/v1/auth/signin
 */
    app.post("/ecomm/api/v1/auth/signin",[authMW.verifySigninBody],authController.signin)



}



