const express= require ( 'express');

const {getOneUser ,getUsers ,addUser, deleteUser , updateUser}= require('../services/userService') 


const urouter = express.Router();


urouter.get("/:uid", getOneUser); 

urouter.post("/" , addUser);

urouter.get("/", getUsers);

urouter.delete("/:uid" , deleteUser)

urouter.put("/:uid/:mark", updateUser)


module.exports = {
    urouter
};