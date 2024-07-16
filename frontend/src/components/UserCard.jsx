import React from "react";
import userAvatar from "../assets/image.png"; // Replace with your actual avatar path

const UserDetailCard = ({ name, department, area, checkTime }) => {
  console.log("card")
  return (
    <div className="max-w-xs md:min-w-[20rem]">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-2">
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src={userAvatar}
            alt="User Avatar"
          />
        </div>
        <div className="p-2">
          {/* <h3 className="text-center text-xl text-red-500 font-medium leading-8">
            {userData.temperature}
          </h3> */}
          <table className="w-full text-xs">
            <tbody>
              {/* <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Mask</td>
                <td className="px-2 py-2">{userData.mask}</td>
              </tr> */}
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Name</td>
                <td className="px-2 py-2">{name}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">
                  Department
                </td>
                <td className="px-2 py-2">{department}</td>
              </tr>
              {/* <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                <td className="px-2 py-2">{userData.phone}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                <td className="px-2 py-2">{userData.email}</td>
              </tr> */}
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">
                  Address
                </td>
                <td className="px-2 py-2">{area}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Time</td>
                <td className="px-2 py-2">{checkTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
