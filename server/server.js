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

// https://medical-appointments-data.netlify.app

app.get("/",async(req,res)=>{
    const data = await ActionTable.find({});
    console.log(data.length)
    return res.status(200).json({status:"SUCCESS",appointments:data});
})

app.post("/book-appointment/:id",async (req,res)=>{
    // appointment booked
    console.log(req.params.id);

    console.log(req.body.title);

    if(req.body.title==="Prescription Refill"){
        console.log("I am here");
        const data=await ActionTable.updateOne({_id:req.params.id},{$set:{status:"processed"}});
    }
    else{
        const data=await ActionTable.updateOne({_id:req.params.id},{$set:{status:"booked"}});
    }
    res.json({status:"SUCCESS"})
})

app.listen(5000,()=>{
    console.log("Server running at Port : 5000")
})