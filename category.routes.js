const authMW = require("../Middleware/auth.MW")

/**
 * POST localhost:8888/ecomm/api/v1/auth/categories
 */
category_controller =require("../Controllers/category.controller")
auth_mw=require("../Middleware/auth.MW")

module.exports =(app)=>{
    app.post("/ecomm/api/v1/auth/categories",[auth_mw.verifyToken,authMW.isAdmin],category_controller.createNewCategory)
    
}