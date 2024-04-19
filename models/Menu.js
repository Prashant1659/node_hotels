const mongoose=require('mongoose');

const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum: ['spicy','sour','sweet'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        required:true
    },
    num_sales:{
        type:Number,
        default:0,
        required:true
    }
})
const menu=mongoose.model('menu',menuItemSchema);
module.exports=menu;