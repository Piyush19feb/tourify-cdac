import axios from "axios";
import config from "../config";

export async function login(email, password) {
  // body parameters
  const body = {
    email,
    password,
  };
  // make API call
  const response = await axios.post(`${config.url}/api/user/login`, body);

  // read JSON data (response)
  return response.data;
}

export async function register(name, email, password, phone, address, role_id) {
  // body parameters
  const body = {
    name,
    email,
    password,
    phone,
    address,
    role_id,
  };
  // make API call
  const response = await axios.post(`${config.url}/api/user/register`, body);

  // read JSON data (response)
  return response.data;
}
