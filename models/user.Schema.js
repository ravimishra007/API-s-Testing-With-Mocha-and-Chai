const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id:{type:Number , requires:true},
    name:{type:String , requires:true},
    email:{type:String , requires:true,unique:true},
    password:{type:String }
},{
    versionKey:false
})

const userModel = mongoose.model("users",userSchema)

module.exports = {userModel}