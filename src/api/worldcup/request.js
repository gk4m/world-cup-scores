import axios from 'axios';

const request = axios.create({
  baseURL: 'http://worldcup.sfg.io',
});

export default request;
