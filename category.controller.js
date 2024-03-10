const category_model = require("../models/category.model")



/**
 * controller for creating catrgory
 * localhost:8888/ecomm/api/v1/auth/categories
 * 
 *   {
    "name":"Household",
    "description":"This will have all the household items "
       }
 */

       exports.createNewCategory =async (req,res)=>{
        // Read the request body

        // create category object 

        const cat_data = {
            name :  req.body.name,
            description : req.body.description
        }


        try{   
            // insert into MongoDB
         
            const category =await category_model.create(cat_data)
            return res.status (201).send (category)
          }catch(err){
            console.log("Errror while creating the category ",err)
            return res.status(500).send ({
                message :"Errror while creating the category"
            })
        }
     



        // return the response of the created category 
    }