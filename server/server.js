const express=require("express");
const app=express();
const cors=require("cors");
require('dotenv').config();
const mongoose=require("mongoose");
const ActionTable = require("./models/action.model");

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("Connected to Database");
})

app.use(express.json());
app.use(cors({
    origin: "https://medical-appointments-data.netlify.app",
    credentials:true
}));

app.get("/",async(req,res)=>{

    const data = await ActionTable.find({});
    console.log(data.length)
    return res.status(200).json({status:"SUCCESS",appointments:data});
})


app.listen(5000,()=>{
    console.log("Server running at Port : 5000")
})