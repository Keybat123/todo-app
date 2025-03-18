import React, { useEffect, useState } from 'react'
import { FaTasks } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth';
import axios from 'axios';
const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[loginUser,setLoginUser]=useState()
    const data = [
        {
            id:1,
            title: "All Tasks",
            icon: <FaTasks />,
            link: '/'
        },
        {
            title: "Important Tasks",
            id:2,
            icon: <MdLabelImportant />,
             link: '/important-task'
        },
        {
            title: "Incomplete Tasks",
            id:3,
            icon: <MdIncompleteCircle />,
             link: '/incomplete-task'
        },
        {
            title: "Completed Tasks",
            id:4,
            icon: <IoMdDoneAll />,
             link: '/completed-task'
        },
    ]

    const logout = ()=>{
        dispatch(authActions.logout())
        localStorage.clear("id")
        localStorage.clear("token")
        navigate("/singup")
    }
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/task/get-all-task", { headers });
                await setLoginUser(response.data.userData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);
  return (
    <>
        <div className='flex flex-col justify-between h-full'>
            <div>
                <h1 className='font-bold tracking-wide text-2xl'>{loginUser?.userName}</h1>
                <h3 className='text-gray-300 text-[12px]'>{loginUser?.email}</h3>
                <hr className='mt-2'/>
            </div>
            <div >
                {data.map((item)=> {
                    return <Link key={item.id} to={item.link} className='hover:font-bold p-1 border border-transparent hover:border-white transition-all duration-300 box-border rounded-md mb-2 hover:cursor-pointer flex items-center gap-1'>{item.icon} {item.title}</Link>
                })}
            </div>
            <div>
                <button 
                onClick={logout}
                className='bg-red-500 w-full rounded-md p-2 font-bold tracking-wide text-[16px] hover:cursor-pointer hover:bg-red-700 transition-all duration-300'>Logout</button>
            </div>
        </div>
    </>
  )
}

export default Sidebar