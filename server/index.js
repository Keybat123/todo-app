const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user.routes")
const taskRoutes = require('./routes/task.routes')
const cors = require("cors")

const app = express()

//database connection
mongoose.connect(process.env.MONGO_DB)
    .then(()=> console.log("Database connection sucessfully."))
    .catch(e => console.log(e))


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Routes 
app.use('/api/user',userRoutes)
app.use('/api/task',taskRoutes)
//connection on port 
app.listen(process.env.PORT,()=>{
    console.log(`Server starting on post ${process.env.PORT}`);
})
