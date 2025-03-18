import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios';

const ImportantTask = () => {
   const [item, setItem] = useState();
  
    useEffect(() => {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/task/important-task",
            { headers }
          );
          setItem(response?.data.impData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [item]);
  return (
    <>
      <div>
        <Card home={"false"} item={item}/>
      </div>
    </>
  )
}

export default ImportantTask