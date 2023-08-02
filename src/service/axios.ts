import axios from 'axios';

const Axios = axios.create({
  baseURL: import.meta.env.PRIVATE_API_ENDPOINT,
  timeout: 10000
});

Axios.interceptors.request.use((config: any) => {
  // if (localStorage.getItem('access_token')) {
  //   config.headers = {'x-access-token' : `${localStorage.getItem('access_token')}`};
  // }
  return config
});

Axios.interceptors.response.use(
  response => response,
  manageErrorConnection
)

function manageErrorConnection(err: any) {
  if (err?.response && err?.response?.status >= 400 && err?.response?.status <= 500) {

    return Promise.reject(new Error(`${err?.response?.status} API Bad status code`))
  } else if (err.code === 'ECONNREFUSED') {

    return 'nevermind'
  } else if (err?.code === 'ECONNABORTED' && err?.message.includes('timeout')) {
    console.log('Request timed out');
  } 
  else {

    return Promise.reject(err)
  }
}

export default Axios;