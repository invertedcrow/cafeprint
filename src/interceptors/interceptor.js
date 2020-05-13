import axios from 'axios';

import { API_URL } from "../consts";

export default function setup() {
  // variant 1
  axios.defaults.headers.common['Authorization'] = "Basic bWZlc3Q6bWZlc3Rvd25lcg==";

   const tokenElement = document.querySelector('[name="csrf-token"]');
   const token = tokenElement.getAttribute("content");
   axios.defaults.headers.common['x-csrf-token'] = token;
   axios.defaults.headers.common['x-requested-with'] = "XMLHttpRequest";

  axios.interceptors.request.use(
    function(config) {
     

      // const username = 'mfest';
      // const password = 'mfestowner';
      // variant 2
      // const basicAuth = 'Basic ' + btoa(username + ':' + password);   
      // config.headers["Authorization"] = basicAuth;

      // variant 3
      // config.auth = {
      //   username: username,
      //   password: password
      // }
      config.url = `${API_URL}${config.url}`;   

      // config.data = {
      //   ...config.data,
      //   _csrf: token
      // };
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );
}