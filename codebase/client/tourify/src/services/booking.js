import axios from "axios";
import config from "../config";

export async function letsBookIt(
  from_date,
  to_date,
  user_id,
  property_id,
  bill
) {
  let actualToken = localStorage.getItem("token");

  const payload = {
    headers: {
      token: actualToken, // Assuming token is for authorization
    },
  };

  const body = {
    from_date,
    to_date,
    user_id,
    property_id,
    bill,
  };

  console.log("Token", actualToken);
  console.log("Body:", body);

  const response = await axios.post(
    `${config.url}/api/booking/property`,
    body,
    payload
  );

  // NOTE: sequence of parameter matters (Should Be: URL, BODY, PAYLOAD)
  //   const response = await axios.post(
  //     `${config.url}/api/booking/property`,
  //     payload,
  //     body
  //   );

  return response.data;
}
