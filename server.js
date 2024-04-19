const express = require('express')
const app = express();
const db=require('./db');
const personRoutes=require('./routes/personRoutes');
const menuRouter=require('./routes/menuRoutes');
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json());// req.body 
const menuItem=require('./models/Menu');


app.get('/', function (req, res) {
  res.send('Hello World')
})

//POST route to add a person

//Without async and await

// app.post('/person',(req,res)=>{

//     const data=req.body;

//     const newPerson=new Person(data);//data is passed as argument, so that data is stored according to the fields

//     //Save the new person to db;
//     newPerson.save((err,person)=>{
//         if(err){
//             console.log("Error in saving data : ",err);
//             res.status(500).json({err:"Internal server error"});
//         }
//         else{
//             console.log("Data saved successfully");
//             res.status(200).json({success:"data saved successfully"})
//         }
//     })

// })

//With ASYNC and AWAIT


app.use('/person',personRoutes);
app.use('/menu',menuRouter);
// app.get('/p1',(req,res)=>{
//     res.send("Hii i am Prashant :-)");
// })
// app.get('/p2',(req,res)=>{
//     res.send("Welcome to my page");
// })

const PORT=process.env.PORT||10000;

app.listen(PORT,()=>{
    console.log("Listening on port 3000");
})
//comment for testing only