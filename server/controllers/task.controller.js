const task = require("../models/task.model");
const user = require("../models/user.model");

const createTask = async(req,res)=>{
    try {
        const {title,description}=req.body
        const userId= await req.userId
        console.log(userId)
        if(!title || !description) return res.status(400).json({message: "Please provide all details."})
        if(title.length <3){
            return res.status(400).json({message: "Title must be atleast 3 characters."})
        }else if(description.length <3){
            return res.status(400).json({message: "Description must be atleast 3 characters."})
        }
        const newTask = new task({title, description})
        const saveTask = await newTask.save()
        const taskId = saveTask._id
        await user.findByIdAndUpdate(userId,{$push: {tasks: taskId}})
        res.status(200).json({message: "Task created successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task Creation failed due to internal server error"})
    }
}

const getAllTask = async(req,res)=>{
    try {
        const userId = req.userId
        const userData = await user.findById(userId).populate({
            path: "tasks",  
            options: {sort: {createdAt: -1}}
        })
        res.status(200).json({userData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task Fetching failed due to internal server error"})
    }
}

const deleteTask = async(req,res)=>{
    try {
        const {id}= req.params;
        const userId = req.userId
        await task.findByIdAndDelete(id)
        await user.findByIdAndUpdate(userId, {$pull: {tasks: id}})
        res.status(200).json({message: "Task deleted successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task Fetching failed due to internal server error"})
    }
}

const updateTask = async(req,res)=>{
    try {
        const {id}= req.params;
        const {title,description} = req.body
        await task.findByIdAndUpdate(id,{ title, description})
        res.status(200).json({message: "Task Updated successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task Fetching failed due to internal server error"})
    }
}

const updateImpTask = async(req,res)=>{
    try {
        const {id}= req.params;
        const taskData = await task.findById(id)
        const impTask = taskData.important
        await task.findByIdAndUpdate(id,{ important: !impTask})
        res.status(200).json({message: "Task status changed successfully.", impTask})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task Fetching failed due to internal server error"})
    }
}

const updateCompleteTask = async(req,res)=>{
    try {
        const {id}= req.params;
        const taskData = await task.findById(id)
        const comTask = taskData.complete
        await task.findByIdAndUpdate(id,{ complete: !comTask})
        res.status(200).json({message: "Task status changed successfully.",comTask})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task Fetching failed due to internal server error"})
    }
}

const getCompleteTask = async(req,res)=>{
    try {
        const userId = req.userId
        const userData = await user.findById(userId).populate({
            path: "tasks",  
            match: {complete: true},
            options: {sort: {createdAt: -1}}
        })
        const impData = userData.tasks
        res.status(200).json({impData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task Fetching failed due to internal server error"})
    }
}

const getIncompleteTask = async(req,res)=>{
    try {
        const userId = req.userId
        const userData = await user.findById(userId).populate({
            path: "tasks",  
            match: {complete: false},
            options: {sort: {createdAt: -1}}
        })
        const impData = userData.tasks
        res.status(200).json({impData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task Fetching failed due to internal server error"})
    }
}

const getImpTask = async(req,res)=>{
    try {
        const userId = req.userId
        const userData = await user.findById(userId).populate({
            path: "tasks",  
            match: {important: true},
            options: {sort: {createdAt: -1}}
        })
        const impData = userData.tasks
        res.status(200).json({impData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task Fetching failed due to internal server error"})
    }
}
module.exports = {
    createTask, 
    getAllTask, 
    deleteTask,
    updateTask,
    updateCompleteTask,
    updateImpTask,
    getImpTask,
    getCompleteTask,
    getIncompleteTask
}