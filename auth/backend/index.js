const express = require('express');
const app = express();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const {DBConnection} = require('./database/db');
const jwt = require('jsonwebtoken');
bodyParser = require('body-parser');
const User = require('./model/User.js');
var cookieParser = require('cookie-parser')
var cors = require('cors')

 


DBConnection();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.get('/',(req,res)=>{
    res.send("Welcome")
});

app.post("/register",async (req,res)=>{
    try{
        const {firstname,lastname, email,password }= req.body;
console.log({firstname,lastname, email,password });
    if(!(firstname || lastname || email || password)){
       return res.status(400).send("Please enter all the field")
    }

    const isUserExist = await User.findOne({email});
    

    if(isUserExist){
        res.status(200).send("User already exists");
    }
    else{

        const hashpass = await bcrypt.hash(password, 8);
      
        const userdata = await User.create({
            firstname,lastname,email, password:hashpass
        });

        var token = jwt.sign({id:userdata._id,email},process.env.SECRET_KEY,{expiresIn:'1h'});

        userdata.token= token;
        console.log(token+"TOKEN");

        res.status(200).json({
            message:'Succesfully registered',
            userdata
        });
    }

    }
    catch(error){
        console.log(error.message);
    }


}
)

app.post("/login",async (req,res)=>{
    const {email,password }= req.body;
    if(!(email || password)){
        return res.status(400).send("Please enter all the field")
     }
     const isUserExist = await User.findOne({email});
     console.log(isUserExist);

     if(isUserExist){
        //password check 
       const tt = bcrypt.compare(password, isUserExist.password);
       if(!tt){
        res.status(200).send("Incorrect password");
       }
       else{
        var token = jwt.sign({id:isUserExist._id,email},process.env.SECRET_KEY,{expiresIn:'1h'});

        isUserExist.token = token;

        console.log(isUserExist.token);

        //store cookies

        const options ={
            expires: new Date(Date.now() + 1*24*60*60*1000),
            httpOnly:true,
        };



        res.status(200).cookie("token",token,options).json({
            message:"Logged in",
            isUserExist
       })
       }
     }
     else{
        return res.status(200).send("No account exists for this email");
     }


})

app.listen(PORT,()=>{
    console.log("Server listening on 8080")
})