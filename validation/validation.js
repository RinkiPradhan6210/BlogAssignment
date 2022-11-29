const joi =require('joi');

const validation = (req,res,next)=>{
    const Schema =joi.object().keys({
        title:joi.string().required(),
        desc:joi.string().required(),
        category:joi.string().required(),
        img:joi.string().required(),
        auther:joi.string().required(),
    
    
    }).unknown(false)
    const {error} = Schema.validate(req.body,{aboutEarly:false})
    if(error){
        const {details} =error
        res.status(400).send({error:details})
    }else{
        next()
    }
    }
    module.exports.validation = validation