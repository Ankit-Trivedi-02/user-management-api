const mongoose=require("mongoose");

//schema

const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    email:{type:String,required:true,unique:true}
});

//creating model for schema

const User= mongoose.model("user",userSchema);

module.exports=User;