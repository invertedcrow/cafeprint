import axios from 'axios';

import { API_URL } from "../consts";

export default function setup() { 
  axios.interceptors.request.use(
    function(config) {
      // const token = this.$store.state.token;
      // if(token) {
      //     config.headers.Authorization = `Bearer ${token}`;
      // }

      config.url = `${API_URL}${config.url}`;
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );
}