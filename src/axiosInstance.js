// axiosInstance.js
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL || 'https://atleticas-app-684aeedaa084.herokuapp.com'

const instance = axios.create({
  baseURL: baseUrl
});

export default instance;
