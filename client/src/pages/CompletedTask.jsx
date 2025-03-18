import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'

const CompletedTask = () => {
    const [item,setItem]=useState()
  useEffect(() => {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
      const fetchData = async () => {
          try {
              const response = await axios.get("http://localhost:5000/api/task/complete-task", { headers });
              setItem(response?.data.impData)
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };
  
      fetchData();
  }, [item]);
  return (
    <>
    <Card item={item}/>
    </>
  )
}

export default CompletedTask