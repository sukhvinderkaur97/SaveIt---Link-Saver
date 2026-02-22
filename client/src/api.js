import axios from "axios";

const API = axios.create({
  baseURL: "https://saveit-link-saver.onrender.com",
});

export default API;