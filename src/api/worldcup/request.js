import axios from 'axios';

const request = axios.create({
  baseURL: 'https://worldcup.sfg.io',
});

export default request;
