const express = require('express');
const router = express.Router();
const postschema = require('../models/postSchema');
const mongoose = require("mongoose");
const userSchema = require('../models/userSchema');

router.post('/', async (req,res) => {
    try{
        const post = new postschema ({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            postedBy: req.body.postedBy
            
        });
        
        const p = await post.save()
        
        res.json({
            isSuccess: true,
            status:200  
        });
    }
    catch (err) {
        res.json({
            isSuccess: false,
            status: 400,
            errDesc: "Unable to create new post " + err,
        });
    }
});


//Get all the posts on database
router.get('/', async (req,res) => {
   try {
       const posts= await postschema.find();
       res.json(posts);    
   } catch (err) {
    res.json({
        isSuccess: false,
        status: 400,
        errDesc: "Unable to get the posts " + err,
    });
   } 
});
//Get all the posts belongs to a user

router.get('/:postId', async (req,res) => {
   try {
    console.log('OK');
    const post = await postschema.findById(req.params.postId);
    res.json(post);
   } catch (err) {
    res.json({
        isSuccess: false,
        status: 400,
        errDesc: "Unable to reach to the post by postId " + err,
    });
   }    
});
    
   
router.patch('/:postId', async (req,res) => {
    try {
        const title = req.body.title;
        const description= req.body.description;
        
        

        if (title) {
            const updatedPost = await postschema.updateOne({_id: req.params.postId},
                { $set: {title: req.body.title}, });
        }

        if (description) {
            const updatedPost = await postschema.updateOne({_id: req.params.postId},
                { $set: {description: req.body.description}}); 
                
        }
        
        const post = await postschema.findById(req.params.postId);
        res.json(post);
      
            
       
    }
    catch (err) {
        res.json({
            isSuccess: false,
            status: 400,
            errDesc: "Unable to update post " + err, 
        });
    }
});

router.delete("/:postId", async(req, res) => {
    try {
        const removedPost=await postschema.remove({_id: req.params.postId})
        
        res.json({
            isSuccess: true,
            status:200  
        });

    }
    catch (err) {   
        res.json({message: err});
   

}
});

module.exports=router;