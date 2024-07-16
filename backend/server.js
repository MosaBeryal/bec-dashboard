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
    const { becServerToken } = req.query;
    let authHeader = req.headers["authorization"];
    authHeader = authHeader.replace(/"/g, "").trim();
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    // Function to format date parts
    const padZero = (number) => (number < 10 ? `0${number}` : number);

    // Get current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = padZero(currentDate.getMonth() + 1);
    const day = padZero(currentDate.getDate());

    const monitorResponse = await axios.get(
      `http://45.8.149.163:8081/ep/api/realtime_monitors/?page=1&year=${year}&month=${month}&day=${day}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    const monitorData = monitorResponse.data.data;

    const getEmployeeData = async (empCode) => {
      try {
        const employeeResponse = await axios.get(
          `https://becbarcodeapp.azurewebsites.net/api/employee?employeeDeviceId=${empCode}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${becServerToken}`,
            },
          }
        );
        return employeeResponse.data;
      } catch (error) {
        return null;
      }
    };

    const combinedDataPromises = monitorData.map(async (monitorRecord) => {
      const empCode = monitorRecord.emp_code;
      const employeeData = await getEmployeeData(empCode);
      // console.log("employee data", employeeData);
      if (employeeData && employeeData.employees.length > 0) {
        return {
          ...monitorRecord,
          ...employeeData.employees[0],
        };
      }
      return null;
    });

    const combinedData = (await Promise.all(combinedDataPromises)).filter(
      (item) => item !== null
    );

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
