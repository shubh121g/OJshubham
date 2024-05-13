const express= require ( 'express');

const {getUserSubmission, getProblemSubmission } = require('../services/submissionService') 

const srouter = express.Router();

srouter.get("/user/:uid", getUserSubmission);
srouter.get("/prob/:pid" , getProblemSubmission);


module.exports = {
    srouter
};