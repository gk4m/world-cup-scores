import axios from 'axios';

const request = axios.create({
  baseURL: 'https://world-cup-json-2018.herokuapp.com',
});

export default request;
