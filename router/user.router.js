const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.Schema');
const userRouter = express.Router();

// get all the data

userRouter.get('/users', async(req,res)=>{
    try {
        const users = await userModel.find()
        return res.status(200).json({error:false,items:users})
        
    } catch (error) {
        console.error(error);
        return res.status(404).json({error:true,msg:"unable to getting the data.."})

    }
})

// get data by Id

userRouter.get('/users/:id', async(req,res)=>{
    const {id} = req.params
    try {
        const user = await userModel.findOne({id:id})
        return res.status(200).json({error:false,items:user})
        
    } catch (error) {
        console.error(error);
        return res.status(404).json({error:true,msg:"unable to getting the data.."})

    }
})


// register

userRouter.post('/register', async(req,res)=>{
    const {name,email,password} = req.body;
     const saltRound = 10;
    try {
        const user = await userModel.findOne({email})
        if (user) {
            console.log(("you are already registered,please log-in"))
            return res.status(401).send({msg:"you are already registered"})
        } else {
            bcrypt.hash(password,saltRound, async(err,hash)=>{
                if (err) {
                    console.error(err);
                    return res.status(404).json({error:true,msg:"unable to registered"})
                }
           const newUser = new userModel({name,email,password:hash})
           await newUser.save();
           return res.status(200).json({error:false,msg:"registered successfully"})
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(404).json({error:true,msg:"unable to registered"})
    }

})


// login


userRouter.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user){
            console.log("user not found! please register first.")
            return res.status(404).json({error:true,msg:"user not found! please register first."})
        } 
       bcrypt.compare(password, user.password, async(err,result)=>{
        if (err) {
            console.error(err);
            return res.status(404).json({error:true,msg:"password not match"})
        }
        if (result) {
            const accessToken = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
            return res.status(200).json({error:false,msg:"login successfully",accessToken})
        } else {
            return res.status(404).json({error:true,msg:"password not match. please put correct password."})
        }
       })
        
    } catch (error) {
        console.error(error);
        return res.status(404).json({error:true,msg:"unable to login"})

    }
})


// update
userRouter.patch("/update/:id", async(req,res)=>{
    const{name,email}= req.body;
try {
    const user = await userModel.findById(req.params.id)
    if(!user){
        console.log("user not found")
        return res.status(404).json({error:true,msg:"user not found"})
    }

    const newUser = await userModel.findByIdAndUpdate({_id:req.params.id},req.body)
        return res.status(404).json({error:true,msg:"updated successfully", newUser})
    
} catch (error) {
    console.error(error);
    return res.status(404).json({error:true,msg:"unable to update"})

}
})

// delete

userRouter.delete("/delete/:id", async(req,res)=>{
    const{name,email}= req.body;
try {
    const user = await userModel.findById(req.params.id)
    if(!user){
        console.log("user not found")
        return res.status(404).json({error:true,msg:"user not found"})
    }

    const newUser = await userModel.findByIdAndDelete({_id:req.params.id},req.body)
        return res.status(404).json({error:true,msg:"deleted successfully", newUser})
    
} catch (error) {
    console.error(error);
    return res.status(404).json({error:true,msg:"unable to delete"})

}
})




module.exports = {userRouter}