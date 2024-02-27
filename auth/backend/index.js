const express = require('express');
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
const  {executeCpp} =require( './executecpp.js')
 


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

app.post("/run",async (req,res)=>{
   

    const {language='cpp',code} = req.body
    console.log(req.body+"inside run")

    if(code==undefined){
        res.status(400).json({
            success:true,
            message:"Empty code body "
        }
        )
    }

    try{
        const filepath = await generateFile(language,code)
        const output = await executeCpp(filepath);

        console.log(filepath);
        console.log(output);
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

app.post("/submitsol",async (req,res)=>{
    try{
        const {pid,uid,code,verdict} = req.body;
        const subData = await Submission.create({
            pid,
            uid,
            code,
            verdict
    
        })

        res.status(200).json({
            "mesage":"Good job",
            subData
        })

    }catch(e){
        res.status(400).send(e);
    }
})

app.post("/addtestcase",async (req,res)=>{
    try{
        const {pid,inputs,outputs} = req.body;
        const tData = await Testcase.create({
            pid,
            inputs,
            outputs
    
        })

        res.status(200).json({
            "mesage":"Good job",
            tData
        })

    }catch(e){
        res.status(400).send(e);
    }
})

app.post("/addproblem",async (req,res)=>{
    try{
        const {title,description,difficulty,tags}= req.body;

        if (!(title && description && difficulty )){
            res.status(400).send('Enter all the fields');
    
        }

        const isProblemExist = await Problem.findOne({title});
        if(isProblemExist){
            res.status(400).send("Title already exists")
        }
        else{
            let tt=[]
            if(tags){
                 tt = tags.split(/[ ,]+/);
            }
        
            console.log(tt);
        
            const problemData = await Problem.create({
                title,
                description,
                difficulty,
                tags:tt
        
            })
            
           
            console.log(req.body);
            res.status(200).json(problemData);

        }
       

    }catch(e){
        res.status(400).send(e);
    }
   
})

app.listen(PORT,()=>{
    console.log("Server listening on 8080")
})