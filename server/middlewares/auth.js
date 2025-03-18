const jwt = require("jsonwebtoken")
const user = require("../models/user.model")

const authenticateUser = async(req,res,next)=>{
    try {
        const authToken = req.headers["authorization"].split(" ")[1]
        if(!authToken) return res.status(401).json({message: "Token Missing...."})
        const verifyToken = await jwt.verify(authToken,process.env.JWT_SECRET)
        if(!verifyToken) {
            return res.status(400).json({message: "Token not matched."})
        }
        const userData = await user.findById(verifyToken.userId)
        req.userId = userData._id
        next()
    }catch (error) {
        console.log(error)
        res.status(500).json({message: "Token not provided.", error})
    }
}
module.exports = {authenticateUser}