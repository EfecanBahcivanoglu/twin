const express = require('express');
const router = express.Router();
const userschema = require('../models/userschema');
const mongoose = require("mongoose");


router.post('/', async (req,res) => {
    try{
        console.log("ok")
        const user = new userschema ({
            _id: new mongoose.Types.ObjectId(),
            nickname: req.body.nickname,
            
            
        });
        console.log("ok")
        const p = await user.save()
        console.log("ok")
        res.json({
            status:200,
        
        });
    }
    catch (err) {
        console.log("catch")
        res.json({
            isSuccess: false,
            status: 400,
            errDesc: "Unable to create new user" + err,
    });
}
});

router.get("/", async(req, res) => {
    try {
        const users= await userschema.find();
        res.json(users);    
        } catch (err) {
            res.json({message:err});
        } 
});            
router.get('/:userId', async (req,res) => {
    try {
     const user = await userschema.findById(req.params.userId);
     res.json(user);
    } catch (err) {
        res.json({message: err});
    }    
 });
     
    
 router.patch('/:userId', async (req,res) => {
     try {
         const updatedUser = await userschema.updateOne({_id: req.params.userId},
         { $set: {nickname: req.body.nickname} });
         res.json(updatedUser)
     }
     catch (err) {
         res.json({message: err});
     }
 });
 
 router.delete("/:userId", async(req, res) => {
     try {
         const removedUser=await userschema.remove({_id: req.params.userId})
         res.json(removedUser);
 
     }
     catch (err) {   
         res.json({message: err});
        }
 });






module.exports=router;