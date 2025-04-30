const express=require("express");
const mongoose=require("mongoose");
const app=express();
const User=require("./model/user");
const routes = require("./routes/user");
const PORT=8000;


//connect mongoose
mongoose.connect("mongodb://127.0.0.1:27017/Testing-database")
.then(()=>{console.log("Connected Mongoose")})
.catch(err=>{console.log("err",err)});


//middle wares 
app.use(express.json());
app.use(express.urlencoded({extended : false}));


//running routes 
app.use("/api/users",routes);


//running server
app.listen(PORT,()=>{
    console.log("Server stsrted at port : ", PORT);
})

