import axios from 'axios';

const request = axios.create({
  baseURL: 'https://www.fifa.com/worldcup/',
});

export default request;
