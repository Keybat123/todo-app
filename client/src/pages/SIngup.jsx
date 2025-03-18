import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const SIngup = () => {
    const[userName,setUsername]= useState("")
    const[email,setEmail]= useState("")
    const[password,setPassword]=useState("")

    const navigate = useNavigate()
    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)

    useEffect(()=>{
      if(isLoggedIn === true){
        navigate("/")
      }
    })
    
    const handleSubmit =async (e)=>{
      e.preventDefault()
      try {
          const {data} = await axios.post("http://localhost:5000/api/user/register",{userName: userName,email: email,password: password})
          alert(data?.message)
          setUsername("")
          setEmail("")
          setPassword("")
          navigate("/login")
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  return (
    <>
        <div className='flex justify-center items-center h-screen'>
            <div className=' flex flex-col bg-gray-900 p-4  rounded-xl'>
                <div className='text-xl font-bold mb-3'>SingUp Form</div>
                <form className='flex flex-col gap-3 w-[350px]' onSubmit={handleSubmit}>
                <input 
                  type="text"
                  placeholder='Enter Username'
                  value={userName}
                  onChange={e => setUsername(e.target.value)}
                  className='bg-gray-400 text-black px-3 py-1 rounded-md outline-none'
                  />
                <input 
                  type="text"
                  placeholder='Enter Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='bg-gray-400 text-black px-3 py-1 rounded-md outline-none'
                  />
                <input 
                  type="password"
                  placeholder='Enter Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='bg-gray-400 text-black px-3 py-1 rounded-md outline-none'
                  />
                  <div className='flex flex-col items-center mt-3'>
                <button type='submit' className='bg-blue-500  rounded-md p-1 font-bold tracking-wide text-[16px] hover:cursor-pointer hover:bg-blue-400 transition-all duration-300 w-full'> singup</button>
                <Link to={'/login'} className='text-gray-400 hover:cursor-pointer mt-2 hover:text-gray-300'>Already have an account? Please Login</Link>
                </div>
                  
                </form>
            </div>
        </div>
    </>
  )
}

export default SIngup