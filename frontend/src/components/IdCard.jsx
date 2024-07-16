// src/components/IdCard.js

import React from "react";
import becCardLogo from "../assets/Frame.png";
import sindalahLogo from "../assets/sindalah.png";
import neaomLogo from "../assets/neomlogo.png";
import becFooter from "../assets/becprintfooter.png";
import userAvatar from "../assets/image.png";
import { formatTime, getColorClass } from "../utils/utils";

const IdCard = ({
  name,
  companyName,
  checkTime,
  employeeCode,
  jobTitle,
  logoColor,
}) => {
  return (
    <div className="min-w-[20rem] h-[26rem] border-2 border-gray-300 bg-white rounded-lg relative overflow-hidden shadow-lg  hover:shadow-gray-400">
      {/* Top blue bar with BEC logo */}
      <div className="bg-[#162092] h-5"></div>
      <div className="absolute top-7 left-0 w-full h-16 flex items-center justify-center">
        <img src={becCardLogo} alt="BEC Logo" className="h-20 object-contain" />
      </div>

      {/* Additional logos at the top corners */}
      <div className="absolute top-16 left-4 w-16 h-16 flex items-center justify-center">
        <img
          src={neaomLogo}
          alt="NEOM Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute top-16 right-4 w-16 h-16 flex items-center justify-center">
        <img
          src={sindalahLogo}
          alt="Sindalah Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* User photo and details */}
      <div className="mt-20 text-center">
        <img
          src={userAvatar}
          alt="User"
          className="w-28 h-28 rounded-full mx-auto border-2 border-gray-300 shadow-md"
        />
        <h2 className="mt-4 text-xl font-bold text-gray-800">{name}</h2>
        <h3 className="text-lg text-gray-600">Bec - {jobTitle}</h3>
      </div>

      {/* ISLAND and check time */}
      <div className="flex flex-col items-center w-full gap-1 mt-4">
        <div className="flex justify-between w-5/6">
          <p className="text-gray-700 text-xl font-semibold">Check Time</p>
          <p className="text-gray-700 text-xl font-semibold">
            {formatTime(checkTime)}
          </p>
        </div>
        <p className={`${getColorClass(logoColor)} font-bold text-lg`}>
          ISLAND
        </p>
        <p className="text-gray-700 text-xl font-semibold">{employeeCode}</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full">
        <img
          src={becFooter}
          alt="BEC Footer"
          className="w-full h-12 object-cover"
        />
      </div>
    </div>
  );
};

export default IdCard;
