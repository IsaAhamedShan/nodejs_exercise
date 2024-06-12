const express = require('express')
const adminRoute = express.Router()//createdAnother admin route in separate file so you can understand how to separate each route and import again;
adminRoute.param("user",(req,res,next,id)=>{
    req.userType = id ==="1"? "admin":"user"
    console.log("setting admin or user attribute")
   next()
})
adminRoute.get("/home", (req,res)=>{
    console.log("inside admin route home")
    res.send({message:`inside admin route home:${req.originalUrl}`})
})

//till now we saw adminRoute.param to check some
// thing and set value according to it
// for that we have to modify it

adminRoute.get("/user/:admin",(req,res)=>{
    res.status(200)
})
adminRoute.get("/:user", (req,res)=>{
    console.log("inside admin route user")
    res.send({message:`inside admin route user:${req.userType}`})
})

module.exports = adminRoute