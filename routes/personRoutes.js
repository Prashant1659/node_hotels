const express=require('express');
const router=express.Router();
const Person=require('./../models/person');

router.post('/',async(req,res)=>{
    try{
    //taking data from http body
    const data=req.body;

    //creating new person to save data
    const newPerson=new Person(data);

    //Save the data of person on db
    const response=await newPerson.save();
    console.log('Data saved : ',response);
    res.status(200).json({response});
    }catch(err){
        console.log("error ",err);
        res.status(500).json({error:"Internal server error"});
    }
})

//Get method to get the person

router.get('/',async (req,res)=>{
    try{
        const data= await Person.find();
        console.log('Data fetechd : ',data);
        res.status(200).json({data});
    }catch(err){
        console.log("error ",err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;//extract the worktype from the URL
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const data=await Person.find({work:workType});
            console.log(`${workType} found`);
            res.status(200).json(data);
        }
        else{
            console.log('data not found');
            res.status(404).json('data not matched');
        }
    }
    catch(err){
        console.log('error occured',err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.put('/:id',async(req,res)=>{// put to update data in db
    try{
        const personId=req.params.id;
        const userData=req.body;
        const response=await Person.findByIdAndUpdate(personId,userData,{
            new:true, //Returns the updated document
            runValidators:true // Run Mongoose Validation
        })
        if(!response){
            return res.status(404).json('Record not found');
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log('error occured',err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json('Record not found');
        }

        console.log('Data deleted');
        res.status(200).json({message:'person record deleted'});

    }catch(err){
        console.log('error occured',err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports=router;