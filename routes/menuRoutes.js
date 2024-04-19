const express=require('express');
const router=express.Router();
const menuItem=require('./../models/Menu');

router.post('/',async(req,res)=>{
    try{
        const menu=req.body
        const newMenu=new menuItem(menu)
        const response= await newMenu.save()
        console.log("Menu data saved")
        res.status(200).json(response)
    }catch(err){
        console.log("error occured in saving menu data",err);
        res.status(500).json({error:'Internal server error'})
    }
})

router.get('/',async(req,res)=>{
    try{
        const data=await menuItem.find()
        console.log("Menu data fetched ",data);
        res.status(200).json(data);
    }
    catch(err){
        console.log("Error occured ",err);
        res.send(500).json({error:'Internal server error'});
    }
})

router.get('/:taste',async(req,res)=>{
    try{
        const itemTaste=req.params.taste;
        if(itemTaste == 'sour' || itemTaste == 'spicy' || itemTaste == 'sweet'){
            const data=await menuItem.find({taste:itemTaste});
            console.log(`${itemTaste} found`);
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error:'Data not found'})
        }
    }catch(err){
        console.log('error : ',err);
        res.status(500).json({error:'Internal server error'})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;
        const itemData=req.body;
        const response=await menuItem.findByIdAndUpdate(itemId,itemData);
        if(!response){
            res.status(400).json("Record not found ");
        }
        console.log('Menu updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log('error : ',err);
        res.status(500).json({error:'Internal server error'})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;
        const response=await menuItem.findByIdAndDelete(itemId);
        if(!response){
            res.status(400).json('Record not found');
        }
        console.log('Menu item delete')
        res.status(200).json('Menu item deleted');
    }
    catch(err){
        res.status(500).json('Internal server error');
    }
})
module.exports=router;