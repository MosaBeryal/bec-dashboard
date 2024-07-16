import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/beclLogo.jpeg";
import { Cctv, LeafyGreen, LogOut } from "lucide-react"; // Import LogOut icon
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    logout();
  };

  return (
    <aside className="w-72 min-h-screen bg-[#bcc0e2] text-white flex-shrink-0 hidden md:flex flex-col border-[#162092] border-r-[1px]">
      <div className="p-5">
        <img src={logoImage} alt="logo" className="rounded-md" />
      </div>
      <nav className="flex-1">
        <ul className="px-5">
          <li className="px-4 py-4 bg-[#162092] hover:bg-[#2b35a3] flex gap-4 rounded-md hover:cursor-pointer">
            <Cctv className="text-white" />
            <Link to="/">Employee Monitoring</Link>
          </li>
        </ul>
      </nav>
      <div className="p-5">
        <button
          onClick={handleLogout}
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-[#162092] hover:bg-[#2b35a3] text-white rounded-md w-full"
        >
          <LogOut className="text-white" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
