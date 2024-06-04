import axios from "axios";
import config from "../config";

export async function getAllPropsInCity(city) {
  const payload = {
    headers: {
      token: localStorage.getItem("token"), // Assuming token is for authorization
    },
  };

  const response = await axios.get(
    `${config.url}/api/properties/all/Agra`,
    payload
  );
  //   const response = await axios.get(
  //     `${config.url}/api/properties/all/${city}`,
  //     payload
  //   );
  return response.data;
}
