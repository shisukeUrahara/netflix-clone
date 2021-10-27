import axios from "axios";

const instance = axios.create({
  baseUrl: "https://themoviedb.org/3",
});

export default instance;
