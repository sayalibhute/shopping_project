import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import { FiSettings, FiLogOut, FiHelpCircle } from "react-icons/fi";
// import { MdOutlineUpgrade } from "react-icons/md";
// import { BsPersonCircle } from "react-icons/bs";
// import { TbAdjustmentsHorizontal } from "react-icons/tb";

const ProfileDropdown = () => {

      const navigate = useNavigate();
    
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Profile Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer"
      >
        SB
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border z-50">
          {/* Email */}
          <div className="px-4 py-3 text-gray-500 text-sm flex items-center gap-2">
            {/* <BsPersonCircle className="text-xl" /> */}
            {/* <span>sayalibhute1@gmail.com</span> */}
          </div>
          <div className="border-t" />

          {/* Options */}
          <div  onClick={() => navigate('/login')} className="hover:bg-gray-100  text-black px-4 py-2 cursor-pointer flex items-center gap-3">
            {/* <MdOutlineUpgrade className="text-lg" /> */}
            <span  >Login</span>
          </div>
          <div onClick={() => navigate('/register')}  className="hover:bg-gray-100  text-black px-4 py-2 cursor-pointer flex items-center gap-3">
            {/* <TbAdjustmentsHorizontal className="text-lg" /> */}
            <span  >Register</span>
          </div>
          <div onClick={() => navigate('/settings')} className="hover:bg-gray-100  text-black px-4 py-2 cursor-pointer flex items-center gap-3">
            {/* <FiSettings className="text-lg" /> */}
            <span  >Settings</span>
          </div>

          <div className="border-t" />

          <div onClick={() => navigate('/settings')} className="hover:bg-gray-100  text-black px-4 py-2 cursor-pointer flex items-center gap-3">
            {/* <FiHelpCircle className="text-lg" /> */}
            <span   >Help</span>
          </div>
          <div  onClick={() => navigate('/logout')} className="hover:bg-gray-100  text-black px-4 py-2 cursor-pointer flex items-center gap-3">
            {/* <FiLogOut className="text-lg" /> */}
            <span >Log out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
