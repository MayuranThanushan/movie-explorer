import axios from "axios";

const API_KEY = "68b0765a6d5c51653ecdd4bda511cc24";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export default tmdb;
