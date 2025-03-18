const { createTask, getAllTask, deleteTask, updateTask, updateImpTask, updateCompleteTask, getImpTask, getCompleteTask, getIncompleteTask } = require("../controllers/task.controller")
const { authenticateUser } = require("../middlewares/auth")

const router = require("express").Router()

router.post('/create-task',authenticateUser,createTask)
router.get('/get-all-task',authenticateUser,getAllTask)
router.delete('/delete-task/:id',authenticateUser,deleteTask)
router.put('/update-task/:id',authenticateUser,updateTask)
router.put('/update-imp-task/:id',authenticateUser,updateImpTask)
router.put('/update-complete-task/:id',authenticateUser,updateCompleteTask)
router.get('/important-task',authenticateUser,getImpTask)
router.get('/complete-task',authenticateUser,getCompleteTask)
router.get('/incomplete-task',authenticateUser,getIncompleteTask)
module.exports = router