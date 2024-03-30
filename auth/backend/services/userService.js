const User = require('../model/User'); 

const getOneUser = (async(req,res)=>{
    try{
        const uid = (req.params.uid);
        const oneUser = await User.findById(uid);
        res.status(200).json(oneUser)

    } catch(e){
        res.status(400).json(e);
    }
})

const getUsers = (async (req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    }
    catch(e){
        res.status(400).json(e);
    }
})

const addUser = (async (req,res)=>{
  
    try{
        const {firstname, lastname, email , password}= req.body;

        if (!(firstname && lastname && email && password )){
            res.status(400).send('Enter all the fields');
    
        }

        const isUserExist = await User.findOne({email});
        console.log(isUserExist+ "is already there ");
        if(isUserExist){
            res.status(400).send("email already exists")
        }
        else{
            
        
            const UserData = await User.create({
                firstname,
                lastname,
                email,
                password
        
            })

            console.log(UserData);
            
           
            console.log(req.body);
            res.status(200).json(UserData);
            return UserData;

        }
       

    }catch(e){
        res.status(400).json(e);
    }
})

const deleteUser =( async(req,res)=>{
    try{
        const uid = (req.params.uid);
        const deletedUser = await User.deleteOne({_id:uid});
        res.status(200).json(deletedUser);
        

    }catch(e){
        res.status(400).json(e);
    }
    
})

const updateUser=( async (req,res)=>{
    try{ console.log("updating user");
        const uid = (req.params.uid);
        const m = (req.params.mark);
        console.log(m);
        const updateduser = await User.findOneAndUpdate(
            { _id: uid },
            { $inc: { marks: m } },
            { new: true } // To return the updated document
        );
        res.status(200).json(updateduser);

    }catch(e){
        res.status(400).json(e);
    }
})

module.exports={
    getOneUser ,getUsers ,addUser, deleteUser , updateUser
}