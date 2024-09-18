import axios from "axios";

const TOKEN = import.meta.env.REACT_APP_GITHUB_TOKEN;

export const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: TOKEN,
  },
});
