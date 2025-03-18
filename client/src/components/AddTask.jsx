import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImCross } from "react-icons/im";

const AddTask = ({inputDiv, setInputDiv, userData ,setUserData}) => {
  const[title,setTitle]= useState("")
  const[description,setDescription]= useState("")
  const headers ={
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(()=>{
    if(userData.id !== null){
      setTitle(userData.title)
      setDescription(userData.description)
    }
  },[userData])

  const handleForm =async(e)=>{
    e.preventDefault();
    try {
      const response =await axios.post("http://localhost:5000/api/task/create-task",{title, description},{headers})
      alert(response.data.message)
      setTitle("")
      setDescription("")
      setInputDiv("hidden")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const updateTask =async(e)=>{
    e.preventDefault();
    try {
      const response =await axios.put(`http://localhost:5000/api/task/update-task/${userData.id}`,{title, description},{headers})
      alert(response.data.message)
      setTitle("")
      setDescription("")
      setInputDiv("hidden")
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
    <>
        <div className={` flex ${inputDiv} top-0 left-0 bg-gray-600 opacity-80 h-screen w-full  flex-col justify-center items-center`}>
            <div className=' flex flex-col bg-gray-900 p-4 justify-center items-center rounded-xl'>
                <div className='flex justify-between items-center pb-2 w-full'>
                  <h1 className='text-xl font-bold'>Add Task</h1>
                  <button 
                  onClick={()=>{
                    setInputDiv("hidden")
                    setTitle("")
                    setDescription("")
                    setUserData({id: "", title: "", description: ""})
                  }}
                  className='hover:cursor-pointer text-red-600 text-2xl hover:text-red-400'>
                  <ImCross />
                  </button>
                </div>
                <form 
                className='flex flex-col gap-3'
                
                >
                  <input 
                  type="text"
                  placeholder='Enter Title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className='bg-gray-400 text-black px-3 py-1 rounded-md outline-none'
                  />
                  <textarea 
                  rows={7} 
                  cols={40}
                  placeholder='Enter Description'
                  value={description}
                  onChange={e=> setDescription(e.target.value)}
                  className='bg-gray-400 text-black px-3 py-1 rounded-md outline-none'
                  ></textarea>
                  {userData.id === ""?<button type='submit' onClick={ (e)=> handleForm(e)} className='bg-green-500  rounded-md p-1 font-bold tracking-wide text-[16px] hover:cursor-pointer hover:bg-green-400 transition-all duration-300'> Add</button>:<button type='submit' onClick={updateTask} className='bg-yellow-500  rounded-md p-1 font-bold tracking-wide text-[16px] hover:cursor-pointer hover:bg-yellow-400 transition-all duration-300'> Updata Task</button>}
                </form>
            </div>
        </div>
    </>
  )
}

export default AddTask