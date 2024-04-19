const mongoose=require('mongoose');

//Define person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
    },
    work:{
        type: String,
        enum: ['waiter','chef','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
});

//Create person model
const person=mongoose.model('person',personSchema);
module.exports=person;