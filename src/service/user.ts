import Axios from "axios";
import { API_ENDPOINT } from "./apis";

const UserService = {
  async login(username: string, password: string) {
    const res = await Axios.post(`${API_ENDPOINT}users/login`, { username, password });

    return res.data;
  }
}

export default UserService;