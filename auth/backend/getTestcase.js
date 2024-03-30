const axios = require('axios').default


const getProblemtestcases = async (pid)=>{
    
    const url =`http://localhost:8080/testcase/${pid}`;
  
    try{
  const arr = await axios.get(url);
   console.log(arr);
  return arr.data;
  
  }
 catch(e){
    console.log(e);
    return e;
  }
 }


 module.exports = {
    getProblemtestcases,
};