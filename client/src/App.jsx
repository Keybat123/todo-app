import React, { useEffect } from 'react'
import Home from './pages/Home'
import {  Route, Routes, useNavigate } from 'react-router-dom'
import AllTask from './pages/AllTask'
import ImportantTask from './pages/ImportantTask'
import IncompleteTask from './pages/IncompleteTask'
import CompletedTask from './pages/CompletedTask'
import SIngup from './pages/SIngup'
import Login from './pages/Login'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from './store/auth'

const App = () => {
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }
  },[dispatch])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/register");
    }
  }, [isLoggedIn, navigate]); 

  return (
    <div className='bg-gray-800 w-full h-screen text-white'>
        <Routes>
          <Route exact path='/' element={<Home />}>
            <Route index element={<AllTask />}/>
            <Route path='/important-task' element={<ImportantTask />}/>
            <Route path='/incomplete-task' element={<IncompleteTask />}/>
            <Route path='/completed-task' element={<CompletedTask />}/>
          </Route>
          <Route path='/register' element={<SIngup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </div>
  )
}

export default App