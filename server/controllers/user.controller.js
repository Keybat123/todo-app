const user = require('../models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerUser = async(req,res)=>{
   try {
     const {userName,email,password}= req.body;
     if(!userName) return res.status(400).json({message: "Please fill username details."})
     if(!email) return res.status(400).json({message: "Please fill email details."})
     if(!password) return res.status(400).json({message: "Please fill password details."})
     const existingUser = await user.findOne({userName})
    const existingEmail = await user.findOne({email})
    if(existingEmail) return res.status(400).json({message: "Email already exists."})
    if(existingUser){
      return res.status(400).json({message: "User already exists."})
    }else if(userName.length <3){
      return res.status(400).json({message: "User name length must be 3 character long."})
    } else{
      const hashPassword = await bcrypt.hash(password,10)
      const newUser = new user({userName, email,password:hashPassword})
      await newUser.save()
      res.status(200).json({message: "User registration successfull."})
    }
   } catch (error) {
        console.log(error)
        res.status(500).json({message: "User registration failed due to internal server error"})
   }
    
}

const loginUser = async(req,res)=>{
  try {
    const {userName, password}= req.body
    if(!userName || !password) return res.status(400).json({message: "Please provide all details."})
      const existingUser = await user.findOne({userName})
    if(!existingUser) return res.status(400).json({message: "User not found with this username."})
    const comparePassword = await bcrypt.compare(password,existingUser.password)
    if(!comparePassword) return res.status(400).json({message: "Password not matched."})
    const userId = existingUser._id
    const token =await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "7d"})
    res.status(200).json({message: "Login successfull.",userId,token})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "User Login failed due to internal server error"})
}
}
module.exports = {registerUser,loginUser}