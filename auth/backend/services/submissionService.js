const Submission = require('../model/Submission');


const getUserSubmission = (async(req,res)=>{
    const userid = (req.params.uid);
    try{
        const usersub = await Submission.find({uid:userid}).sort({ datetime: -1 });
        res.status(200).json(usersub)
    }catch(e){
        res.status(400).json(e);
    }
})

const getProblemSubmission = (async(req,res)=>{
    const probid = (req.params.pid);
    console.log(probid);

    try{
        const probsub = await Submission.find({pid:probid}).sort({ datetime: -1 });
        res.status(200).json(probsub);
    }catch(e){
        res.status(400).json(e);
    }
})





module.exports={
    getUserSubmission,
    getProblemSubmission

}