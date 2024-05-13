const express = require('express');
const axios = require('axios').default
const app = express();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const {DBConnection} = require('./database/db');
const jwt = require('jsonwebtoken');
bodyParser = require('body-parser');
const User = require('./model/User.js');
const Problem = require('./model/Problem.js')
var cookieParser = require('cookie-parser')
var cors = require('cors');
const Submission = require('./model/Submission.js');
const Testcase = require('./model/Testcase.js');

const { generateFile } = require('./generateFile.js')
const { generateInputfile } = require('./generateInputfile.js')
const  {executecpp} =require( './executecpp.js')
const {getProblemtestcases} = require('./getTestcase.js')


const {prouter} = require('./controller/problemController.js')
const {trouter} = require('./controller/testcaseController.js');
const { urouter } = require('./controller/userController.js');

const {srouter} = require('./controller/submissionController.js');




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
app.use('/problems',prouter);
app.use('/testcase',trouter);
app.use('/user', urouter);
app.use('/submission',srouter);


app.post("/run",async (req,res)=>{
   

    const {language='cpp',code,input} = req.body
   

    if(code==undefined){
        res.status(400).json({
            success:true,
            message:"Empty code body "
        }
        )
    }

    try{
        const filepath = await generateFile(language,code)
        const inputpath = await generateInputfile(input)
       
        const output = await executecpp(filepath,inputpath);
        

       
        res.json({
            filepath,
            output
        })
    }
    catch(err){
        console.log(err);
    }

})

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

app.post("/submit",async (req,res)=>{
   
    try{
        const {pid,uid,code,uname,language} = req.body.subbody;
       const ss =await  getProblemtestcases(pid);
       const filepath = await generateFile(language,code);
       let comment ="passed";
       let v =true;
       
      for(let i=0;i<ss.length;i++)
      {
        let ip = ss[i].inputs;
        
        let inputpath = await generateInputfile(ip);
        let output = await executecpp(filepath,inputpath);
        if(output != ss[i].outputs)
        {
            comment = `failed on testcase ${i}`;
          
            v =false;
            break;
        }

      }

      
    
       
       

        
        const subData = await Submission.create({
            language,
            uname ,
            pid,
            uid,
            code,
            verdict:v,
            comment 

    
        })

        console.log(subData);

        res.status(200).json({
            "mesage":"Good job",
            subData
        })

    }catch(e){
        res.status(400).send(e);
    }
})





app.listen(PORT,()=>{
    console.log("Server listening on 8080")
})