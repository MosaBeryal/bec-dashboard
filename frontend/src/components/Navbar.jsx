import React from "react";
import { Menu } from "lucide-react";
import logoImage from "../assets/beclLogo.jpeg";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("token")
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  return (
    <header className="bg-[#162092] text-white shadow-md p-2 flex justify-between items-center w-[calc(100% - 18rem)]">
      <div className="flex gap-2 items-center">
        <Menu />
        <h1 className="text-xl font-bold">BEC Arabia</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* <p className="text-lg">mosaberyal@gmail.com</p> */}
        <img src={logoImage} alt="logo" className="rounded-md w-16" />
      </div>
    </header>
  );
};

export default Navbar;
