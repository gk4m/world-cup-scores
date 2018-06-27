import axios from 'axios';

const request = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet,contentDetails',
    key: 'AIzaSyCiYkbD-A_RW7_1RWC4sLLhaoGZzLgnxyg',
  },
});

export default request;
