const mongoose=require("mongoose");

const actionTableSchema = new mongoose.Schema({
    qurenoteUserId : {
        type : String,
        required : false,
    },
    patientName: {
        type: String,
        required: false
    },
    dob : {
        type : Date,
        required : false
    },
    phone : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : false,
    },
    reason : {
        type : String,
        required : false
    },
    time : {
        type : Date,
        required : false
    },
    action : {
        type : String,
        enum : ['follow-up', 'refill', 'appointment', 'referral'],
        required : true,
    },
    status : {
        type : String,
        enum : ['open', 'booked'],
        required : true,
    },
    chiefComplaint : {
        type : String,
        required : false,
    },
},
{
    timestamps : true,
}
);
 
const actionTable = mongoose.model("ActionTable", actionTableSchema);
 
module.exports = actionTable;