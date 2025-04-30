const express=require("express");
const routes=express.Router();
const { handelAllUser, handelInputUser,handelUpdateUser,handelDeleteUser}=require("../controller/user")

//Getting User modal

const User=require("../model/user");

//routes 

// GET all users
routes.get("/",handelAllUser);

// POST create new user
routes.post("/",handelInputUser);

//PATCH update data of user 
routes.patch("/:id",handelUpdateUser)

//DElETE delete existing data    
routes.delete("/:id",handelDeleteUser)

module.exports=routes;