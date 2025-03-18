const mongoose = require("mongoose")
const validator = require("validator")

const userSchema =new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a correct email."]
    },
    password: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "task"
        }
    ]
},{ timestamps: true })
module.exports = mongoose.model("user",userSchema)