import axios from "axios";

const request = axios.create({
  baseURL: "https://www.fifa.com/worldcup/archive/russia2018"
});

export default request;
