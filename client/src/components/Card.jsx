
import { FaRegHeart } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Card = ({home,setInputDiv,item, setUserData}) => {
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
    //change complete status
    const handleTaskStatus =async(id)=>{
        try {
            const response = await axios.put(`http://localhost:5000/api/task/update-complete-task/${id}`,{}, { headers });
             alert(response.data.message);
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    }
    
    //delete task
    const deleteTask =async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:5000/api/task/delete-task/${id}`, { headers });
             alert(response.data.message);
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    }

    //set imp task
    const handleImpTask = async(id)=>{
        try {
            const response = await axios.put(`http://localhost:5000/api/task/update-imp-task/${id}`,{}, { headers })
            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    //update task
    const updateTask =async(id,title,description)=>{
            setInputDiv("fixed")
            setUserData({id , title, description})
    }
    
  return <>
          
        <div className='grid md:grid-cols-4 gap-4 '>
            {item?.map((item)=>{
                return <div key={item._id} className=' bg-gray-700 rounded-md p-3 flex flex-col justify-between text-wrap overflow-hidden'>
                <div> 
                    <h1 className='font-bold text-xl text-center mb-1'>{item.title}</h1><hr />
                    <h2 className='mt-1 text-gray-300'>{item.description}</h2>
                </div>
                <div className='flex flex-row justify-between items-center gap-4 mt-2'>
                    <button 
                    onClick={()=> handleTaskStatus(item._id)}
                    className={`${item?.complete===false? "bg-red-500 hover:bg-red-400": "bg-green-500 hover:bg-green-400"} w-1/2 rounded-md p-1 font-bold tracking-wide text-[16px] hover:cursor-pointer transition-all duration-300`}>{item?.complete===true? "Completed": "Incomplete"}</button>
                    <div className='flex gap-7 w-1/2 text-xl '>
                    {item?.important === false? (<button onClick={()=> handleImpTask(item._id)}>
                    <FaRegHeart className='hover:cursor-pointer '/>
                    </button>): (<button onClick={()=> handleImpTask(item._id)}>
                    <FaHeart className="hover:cursor-pointer text-red-400"/>
                    </button>)}
                    
                    {home === "true" && <button onClick={()=> updateTask(item._id,item.title,item.description)}> <FaRegEdit className='hover:cursor-pointer hover:text-yellow-500'/></button>}
                    <button
                    onClick={()=> deleteTask(item._id)}>
                    <MdDelete className='hover:cursor-pointer hover:text-red-500'/>
                    </button>
                    </div>
                </div>
                </div>
            })}
            {home === "true" && <button 
            onClick={()=> setInputDiv("fixed")}
            className=' bg-gray-700 rounded-md p-3 flex flex-col justify-center items-center hover:cursor-pointer hover:scale-105 transition-all duration-300'>
            <IoIosAddCircle className='text-4xl'/>
            <h1 className='text-xl font-bold mt-2'>Add Task</h1>
            </button>}
        </div>
  </>
}

export default Card