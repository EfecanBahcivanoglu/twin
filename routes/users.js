const express = require('express');
const router = express.Router();
const userschema = require('../models/userSchema'); //Change the userSchema to User best app practises
const mongoose = require("mongoose");
const userSchema = require('../models/userSchema');

//aynı nickname  error def

router.post('/', async (req,res) => {
    const id = new mongoose.Types.ObjectId()
    const user = new userschema ({
        _id: id,
        nickname: req.body.nickname, });
        
    try {    
        const p = await user.save()
        res.json({
            user,
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
        const userId = req.params.userId;
        const length =req.body.nickname.length
        console.log(length)
        if (length < 4) {
            throw res.json("Nickname should be more than 3 characters")
        }
        
        
        const update = await userSchema.updateOne({ _id: userId },
                { $set: {nickname: req.body.nickname} });
        res.json({
          isSuccess: true,
          status: 200,
        });
    
      }
      catch (err) {
        res.json({
          isSuccess: false,
          status: 404,
          // errDesc: "Update profile error. " + err,
        });
        console.log("UPDATE PROFILE ERROR", err)
      }
    });
    
 

 router.delete("/:userId", async(req, res) => {
     try {
         //Status inactive data silinmez
         const removedUser=await userschema.remove({_id: req.params.userId})
         res.json(removedUser);
 
     }
     catch (err) {   
         res.json({message: err});
        }
 });






module.exports=router;