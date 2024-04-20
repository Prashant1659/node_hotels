const mongoose=require('mongoose');
require('dotenv').config();
//define the Monogdb connection URL
// const mongoURL=process.env.mongodbURL
// const mongoURL='mongodb://localhost:27017/db'// we can replace 'hotels' with any other db name :-)
const mongoURL=process.env.dbURL;

//setup MongoDb Connection
mongoose.connect(mongoURL,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // rejectUnauthorized:false
})

//Get default connection
//Mongoose maintains a default connection object representing the Mongo connection
const db=mongoose.connection;

//Define event listeners in mongo db 
//listeners=['connected','error','disconnected'];
db.on('connected',()=>{
    console.log("Db is connected");
})
db.on('error',(err)=>{
    console.log("Error occured ",err);
})
db.on('disconnected',()=>{
    console.log("Db is disconnected");
})

//Export the db connection

module.exports=db;