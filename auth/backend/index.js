const express = require('express');
const app = express();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const {DBConnection} = require('./database/db');
const jwt = require('jsonwebtoken');
bodyParser = require('body-parser');
const User = require('./model/User.js');

DBConnection();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
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

app.post("/login",(req,res)=>{
    res.send("Login page")
})

app.listen(PORT,()=>{
    console.log("Server listening on 8080")
})