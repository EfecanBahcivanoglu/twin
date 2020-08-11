const express = require('express');
const router = express.Router();
const postschema = require('../models/postschema');
const mongoose = require("mongoose");



router.post('/', async (req,res) => {
    
    try{
        console.log("ok")
        const post = new postschema ({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            postedBy: req.body.postedBy
            
        });
        const p = await post.save()
        console.log("ok")
        res.json({
            status:200,
            
        });
    }
    catch (err) {
        res.json({
            isSuccess: false,
            status: 400,
            errDesc: "Unable to create new post" + err,
    });
}
});
//Get all the posts
router.get('/', async (req,res) => {
   try {
       const posts= await postschema.find();
       res.json(posts);    
   } catch (err) {
       res.json({message:err});
   } 
});
router.get('/byname', async (req,res) => {
    const user = req.body.nickname
    console.log(user)

    
    try {
        const posts= await postschema.find({"postedBy" : user});
        res.json(posts);    
    } catch (err) {
        res.json({message:err});
    } 
 });

router.get('/:postId', async (req,res) => {
   try {
    const post = await postschema.findById(req.params.postId);
    res.json(post);
   } catch (err) {
       res.json({message: err});
   }    
});
    
   
router.patch('/:postId', async (req,res) => {
    try {
        const updatedPost = await postschema.updateOne({_id: req.params.postId},
        { $set: {title: req.body.title} });
        res.json(updatedPost)
    }
    catch (err) {
        res.json({message: err});
    }
});

router.delete("/:postId", async(req, res) => {
    try {
        const removedPost=await postschema.remove({_id: req.params.postId})
        res.json(removedPost);

    }
    catch (err) {   
        res.json({message: err});
   

}
});

module.exports=router;