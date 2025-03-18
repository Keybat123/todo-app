import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="bg-gray-500 w-full h-screen  text-white">
        <div className="p-2 ">
        <div className="flex gap-2">
          <div className="bg-gray-800 border-2 border-black h-[97.8vh]  p-4 w-2/6  md:w-1/6 rounded-xl">
            <Sidebar />
          </div>
          <div className=" bg-gray-800 border-2 border-black md:w-5/6 rounded-xl p-4 ">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;
