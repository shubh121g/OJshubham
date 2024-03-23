const express= require ( 'express');
//import {addproblem} from '../services/problemService'
const {getOnetest,getTestcases,addTestcase, deleteOnetest}= require('../services/testcaseService') 

const trouter = express.Router();

trouter.get("/:pid", getTestcases); 

trouter.post("/:pid" , addTestcase);

trouter.get("/case/:testid", getOnetest);

trouter.delete("/case/:testid" , deleteOnetest)

trouter.get("/something", async (req,res)=>{
    res.send("yoou dont have anything here yet")
})

module.exports = {
    trouter
};