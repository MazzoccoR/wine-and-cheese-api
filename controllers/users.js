import express from "express";
import passport from "passport";
import User from "../models/user.js";
import req from "express/lib/request.js";

//create router
const router = express.Router();

router.post('/register', async(req, res) => {
    //use passport-local-mongoose inherited method in user model to try creating new user
    //create user first, then add password second to it gets salted and hashed
    try{
        //douplicate username check
        let user = await User.findOne({username: req.body.username}); //cant be const cause we will change it
        if(user){
            return res.status(400).json({message: 'Username already taken'});
        }
        user = new User({username: req.body.username});
        await user.setPassword(req.body.password);
        await user.save();
        return res.status(201).json({msg:'User registedd successfully'});
    }
    catch (err){
        return res.status(400).json({err});
    }
});

router.post('/login', async (req, res) => {
    try{
        const{user}=await User.authenticate()(req.body.username, req.body.password);
        if(user){
            return res.status(200).json(req.body.username);
        }
        else{
            return res.status(401).json({message: 'Invalid login'});
        }
    }
    catch(err){
        return res.status(400).json({err});
    }
});

//make public
export default router;