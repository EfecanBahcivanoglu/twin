const express = require('express');
const router = express.Router();
const userschema = require('../models/userSchema'); //Change the userSchema to User best app practises
const mongoose = require("mongoose");
const userSchema = require('../models/userSchema');




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
            res.json({
                isSuccess: false,
                status: 404,
                errDesc: "Getting user list error" + err,
            });
        } 
});            

router.get('/:userId', async (req,res) => {
    try {
        const user = await userschema.findById(req.params.userId);
        res.json(user.nickname);
        
    } catch (err) {
        res.json({
          isSuccess: false,
          status: 404,
          errDesc: "Getting user by userId error" + err,
        });
    }

}); 
  
router.patch('/:userId', async (req,res) => {
    try {
        const userId = req.params.userId;
        const length =req.body.nickname.length
        const nickname = req.body.nickname
        const user = await userschema.findById(req.params.userId);
        
        console.log(length)
        if (length < 4) {
            throw res.json("Nickname should be more than 3 characters")
        }
        if (user.nickname == nickname) {
            throw res.json("You cannot change the nickname to same thing")
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
          errDesc: "Update profile error. " + err,
        });
        
      }
    });
    
 
router.delete("/:userId", async(req, res) => {
     try {
        const user = await userschema.findById(req.params.userId);
        if (user.activityStatus == true) {
         const removedUser=await userschema.findByIdAndUpdate({_id: req.params.userId},
            { $set: {activityStatus: false} });
            res.json({
                message: "The user became inactive",
                isSuccess: true,
                status: 200,
              });
        }  else {
            throw "User is already deleted"
        }
    }
     catch (err) {   
        res.json({
            isSuccess: false,
            status: 404,
            errDesc: "Delete user error " + err,
        });
     }
 });


module.exports=router;