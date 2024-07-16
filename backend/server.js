const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const response = await axios.post(
      "http://45.8.149.163:8081/jwt-api-token-auth/",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/realtime-data", async (req, res) => {
  try {
    let authHeader = req.headers["authorization"];
    authHeader = authHeader.replace(/"/g, "").trim();
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    // Get real-time monitors data
    const monitorResponse = await axios.get(
      "http://45.8.149.163:8081/ep/api/realtime_monitors/?page=1&year=2024&month=07&day=15",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );
    

    const monitorData = monitorResponse.data.data;

    // console.log(monitorResponse)


    // Function to get employee data for a given emp_code
    const getEmployeeData = async (empCode) => {
      try {
        const employeeResponse = await axios.get(
          `http://localhost:5050/api/employee?employeeDeviceId=${empCode}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
          }
        );
        return employeeResponse.data;
      } catch (error) {
        // Return null if the request fails
        return null;
      }
    };

    // Combine monitor data with employee data
    const combinedDataPromises = monitorData.map(async (monitorRecord) => {
      const empCode = monitorRecord.emp_code;
      const employeeData = await getEmployeeData(empCode);
      console.log("employeedata", employeeData)
      if (employeeData.employees.length > 0) {
        return {
          ...monitorRecord,
          ...employeeData.employees[0],
        };
      }
      return null;
    });

    // Resolve all promises and filter out null values
    const combinedData = (await Promise.all(combinedDataPromises)).filter(
      (item) => item !== null
    );

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

// Your existing routes and middleware

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
