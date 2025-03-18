import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth'
import { useDispatch } from 'react-redux'

const SIngup = () => {
    const[username,setUsername]= useState("")
    const[password,setPassword]=useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin =async(e)=>{
      e.preventDefault()
      try {
          const response = await axios.post("http://localhost:5000/api/user/login",{userName: username, password})
          setUsername("")
          setPassword("")
          localStorage.setItem("id",response.data.userId)
          localStorage.setItem("token",response.data.token)
          dispatch(authActions.login())
          alert(response.data.message)
          navigate("/")
      } catch (error) {
        alert(error.response?.data?.message)
      }
    }
  return (
    <>
        <div className='flex justify-center items-center h-screen'>
            <div className=' flex flex-col bg-gray-900 p-4  rounded-xl'>
                <div className='text-xl font-bold mb-3'>Login Page </div>
                <form className='flex flex-col gap-3 w-[350px]' onSubmit={handleLogin}>
                <input 
                  type="text"
                  placeholder=' Username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className='bg-gray-400 text-black px-3 py-1 rounded-md outline-none'
                  />
                <input 
                  type="password"
                  placeholder=' Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='bg-gray-400 text-black px-3 py-1 rounded-md outline-none'
                  />
                  <div className='flex flex-col items-center mt-3'>
                <button type='submit' className='bg-blue-500  rounded-md p-1 font-bold tracking-wide text-[16px] hover:cursor-pointer hover:bg-blue-400 transition-all duration-300 w-full'> Login</button>
                <Link to={'/register'} className='text-gray-400 hover:cursor-pointer mt-2 hover:text-gray-300'>Don't have an accout? Singup here</Link>
                </div>
                </form>
                
            </div>
        </div>
    </>
  )
}

export default SIngup