const express= require ( 'express');
//import {addproblem} from '../services/problemService'
const {addproblem, getProblems , getProblem} = require('../services/problemService') 

const prouter = express.Router();

prouter.get("/", getProblems); 

prouter.post("/" , addproblem);

prouter.get("/:problemId", getProblem);

prouter.get("/something", async (req,res)=>{
    res.send("yoou dont have anything here yet")
})

module.exports = {
    prouter
};