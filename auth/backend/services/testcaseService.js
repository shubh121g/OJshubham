
const Testcase = require('../model/Testcase')

const  getTestcases = (async(req,res)=>{
    try{
        console.log("Inside get testcases");
        const pid = (req.params.pid);
        console.log("Inside get testcases"+pid);
        const alltestcases = await Testcase.find({pid})
        res.status(200).json(alltestcases)
    }catch(e){
        res.status(400).json(e);
    }
   

})

const getOnetest = (async (req,res)=>{
    const tid = (req.params.testid);
    
    try{
        const onetest = await Testcase.findById(tid);
        res.status(200).json(onetest)
    }catch(e){
        res.status(400).json(e);
    }
})

const deleteOnetest = (async (req,res)=>{
    const tid = (req.params.testid);
    

    try {
        const deletedtest  = await Testcase.findByIdAndDelete(tid);
        if(!deletedtest){
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json({message:"delete hua sahi se"});
    }catch(error){
        console.error("Error deleting document:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const addTestcase =(async (req,res)=>{

    const pid = (req.params.pid);

    console.log("Inside serive function to add test")
    try{
        const {inputs,outputs}= req.body;

        if (!(inputs && outputs )){
            res.status(400).send('Enter all the fields');
    
        }

        
    
        
            const testData = await Testcase.create({
                pid,
                inputs,
                outputs
        
            })

            console.log(testData);
            
           
            console.log(req.body);
            res.status(200).json(tData);
            return problemData;

        }
       

    catch(e){
        return e;
    }
})

module.exports={
    getTestcases,
    getOnetest,
    addTestcase,
    deleteOnetest
}