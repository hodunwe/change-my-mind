import React from 'react';
import { FaRegUser } from 'react-icons/fa';

const SideBar = () => {
  return (
    <nav className="w-[190px] h-full bg-white flex flex-col items-center p-2 fixed">
      <div className="text-left p-2">
        <a href="#home" className="text-lg font-bold tracking-wider text-gray-800 no-underline">
          ARGUMATE
        </a>
      </div>
      <div className="flex justify-center items-center mt-2">
        <div className="w-32 h-32 bg-gray-300 rounded-full flex justify-center items-center">
          <FaRegUser className="text-4xl" />
        </div>
      </div>
      <div className="text-lg mt-4 text-center text-gray-800">
        <h1>Hello</h1>
      </div>
      <ul className="flex flex-col mt-6 space-y-1 items-center">
        <li><a href="#d1" className="text-lg text-gray-800">D1</a></li>
        <button class="btn btn-blue">Button
        </button>

        
        <li><a href="#d2" className="text-lg text-gray-800">D2</a></li>
        <li><a href="#d3" className="text-lg text-gray-800">D3</a></li>
        <li><a href="#login" className="text-lg text-gray-800">Login</a></li>
      </ul>
    </nav>
  );
};

export default SideBar;
