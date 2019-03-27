import axios from 'axios';

//Hardcoded token for demo purposes
const token = "b26c6d5f";

//Intercept every request and append token
axios.interceptors.request.use(function(config) {
  config.params = { ...config.params, apikey: token }
  return config;
}, function(err) {
  return Promise.reject(err);
});