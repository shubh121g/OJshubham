
const Problem = require('../model/Problem')

const getProblems = (async(req,res)=>{
    try{
        console.log(req);
        const allproblems = await Problem.find()
        res.status(200).json(allproblems)
    }catch(e){
        res.status(400).json(e);
    }
   

})

const getProblem = (async (req,res)=>{
    const pid = (req.params.problemId);
    try{
        const oneprob = await Problem.findById(pid);
        res.status(200).json(oneprob)
    }catch(e){
        res.status(400).json(e);
    }
})

const addproblem =(async (req,res)=>{

    console.log("Inside serive function to add problem")
    try{
        const {title,description,difficulty,tags}= req.body;

        if (!(title && description && difficulty )){
            res.status(400).send('Enter all the fields');
    
        }

        const isProblemExist = await Problem.findOne({title});
        console.log(isProblemExist+ "is already there ");
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

            console.log(problemData);
            
           
            console.log(req.body);
            res.status(200).json(problemData);
            return problemData;

        }
       

    }catch(e){
        return e;
    }
})

module.exports={
    addproblem,
    getProblems,
    getProblem
}