const validateRequest=async(req,res)=>{
   if(req.headers["content-type"]!=="application/json"){
      res.status(400).send({
        error:'Content-Type must be application/json'
      });
      return false;
   }
   const data=req.body;
   if(!data){
    res.status(400).send({
        error:'Request Body is required'
    });
    return false;
   }
   if(typeof data!== "object"|| Array.isArray(data)){
    res.status(400).send({
        error:`Invalid request body format`
    });
    return false;
   }
   return data;
}


const validateFormRequest=async(req,res)=>{
  if(!req.headers["content-type"]?.includes("multipart/form-data")){
      res.status(400).send({error:"Content-Type must be multipart/form-data"});
      };
      const data=req.body;
      data.file=req.file;//Muter will handel the file upload if require
      if(!data){
        res.status(400).send({
            error:"Request body is required."
        })
      }

      if(typeof data !== "object"|| Array.isArray(data)){
        res.status(400).send({
            error:`Invalid request body format`
        });
        return false;
      }
      return data;
  }

  export default{
    validateRequest,
    validateFormRequest
  }