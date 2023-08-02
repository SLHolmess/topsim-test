import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.PUBLIC_API_ENDPOINT,
  timeout: 10000,
});

Axios.interceptors.request.use((config: any) => {
  if (localStorage.getItem("token")) {
    config.headers = {
      "x-access-token": `${localStorage.getItem("token")}`,
    };
  }
  return config;
});

axios.interceptors.response.use(
  (res) => {

    return res;
    
  },
  (error) => {

    console.error(error);

    return Promise.reject(error);
  }
);
export default Axios;
