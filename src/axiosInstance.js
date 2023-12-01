// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://atleticas-app-684aeedaa084.herokuapp.com'
});

export default instance;
