const express = require('express');
const router = express.Router();
const validation = require('../validation/validation.js')
const blogModel = require('../models/blogModel.js');
const { find } = require('../models/blogModel.js');

router.post("/create", validation.validation,async(req,res)=>{
    try {
        let blogsData = req.body
        let { title,desc,category,img,auther } = blogsData
        
        let data = await blogModel.create(blogsData)
        return res.status(201).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

})

router.get('/get', async(req,res)=>{
    
        try {
            
            let filterQuery =req.query
           let {category,auther} = filterQuery
           
           let data = await blogModel.find(filterQuery).sort({auther:1})
           if(!data){
            return res.status(404).send({msg:"No data found as per the query filter"})
           }
           res.status(200).send({msg:"success",data:data})  
    
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    
})
router.put('/:blogId', async(req,res)=>{
    
    try {
        let blogId = req.params.blogId
        let updatedData =req.body
       let {title,desc,category,auther,img} = updatedData
       
       let data = await blogModel.findOneAndUpdate(blogId,updatedData,{new:true})
       if(!data){
        return res.status(404).send({msg:"No blog found"})
       }
       res.status(200).send({msg:"success",data:data})  

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

})

router.delete('/:blogId',async(req,res)=>{
    try {
        let blogId = req.params.blogId

       let data = await blogModel.findOneAndDelete(blogId)
       if(!data){
        return res.status(404).send({msg:"Blog is already deleted"})
       }
       res.status(200).send({msg:"successfully deleted"})  

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

})

module.exports = router;