import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { IoIosAddCircle } from 'react-icons/io'
import AddTask from '../components/AddTask'
import axios from 'axios'

const AllTask = () => {
  const[inputDiv,setInputDiv]= useState("hidden")
  const [item,setItem]=useState()
  const [userData,setUserData]=useState({id: "", title: "", description: ""})

//get all tasks
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`
  }
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/task/get-all-task", { headers });
            await setItem(response.data.userData.tasks);
        } catch (error) {
            console.error("Error fetching data:", error?.response.data.message);
        }
    };

    useEffect(() => {
     fetchData()
    })
    

  //make tasks as important
  return (
   <>
    <div>
        <div className='flex justify-end px-2'>
           <button onClick={()=> setInputDiv("fixed")}>
           <div className='flex justify-center items-center gap-2 bg-gray-700 px-2 py-1 rounded-md mb-2 hover:bg-gray-500 hover:cursor-pointer'>
           <IoIosAddCircle  className='text-4xl'/>
           <h1 className='font-bold'>Add Task</h1>
           </div>
           </button>
          </div>
        <div>
          {item && <Card home={"true"} setInputDiv={setInputDiv} item={item} setUserData={setUserData}/>}
        </div>
    </div>
    <div>
      <AddTask inputDiv={inputDiv} setInputDiv={setInputDiv} userData={userData} setUserData={setUserData} />
    </div>
   </>
  )
}

export default AllTask