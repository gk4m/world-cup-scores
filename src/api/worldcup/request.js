import axios from 'axios';

const request = axios.create({
  baseURL: '//worldcup.sfg.io',
});

export default request;
