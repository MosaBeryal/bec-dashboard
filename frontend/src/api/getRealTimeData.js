import api from "./api";

// get real time data
export const getRealTimeData = async () => {
  try {
    const response = await api.get("realtime-data");
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
