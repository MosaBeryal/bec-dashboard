import api from "./api";

export const login = async ({ username, password }) => {
  try {
    console.log(username, password);
    const response = await api.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};
