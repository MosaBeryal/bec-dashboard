import React, { useEffect } from "react";
import UserDetailCard from "../components/UserCard";
import { getRealTimeData } from "../api/getRealTimeData";
import IdCard from "../components/IdCard";

const EmployeeMonitoring = () => {
  // use state
  const [data, setData] = React.useState([]);

  useEffect(() => {
    // Function to fetch real-time data
    const fetchData = async () => {
      try {
        const res = await getRealTimeData(); // Make sure this returns a promise
        console.log(res);
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set interval to fetch data every 1 minute
    const intervalId = setInterval(fetchData, 60000); // 60000 milliseconds = 1 minute

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="flex flex-wrap gap-10 mt-5">
      {data?.map((item) => {
        return (
          <IdCard
            key={item.id}
            name={item.name}
            employeeCode={item.employeeCode}
            jobTitle={item.jobTitle}
            department={item.department}
            logoColor={item.logoColor}
            checkTime={item.check_time}
          />
        );
      })}
    </div>
  );
};

export default EmployeeMonitoring;
