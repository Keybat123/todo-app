const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    important: {
        type: Boolean,
        required: true,
        default: false
    },
    complete: {
        type: Boolean,
        required: true,
        default: false
    },
},{ timestamps: true })
module.exports = mongoose.model("task", taskSchema)
