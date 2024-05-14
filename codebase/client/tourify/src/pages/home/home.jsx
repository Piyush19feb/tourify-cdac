import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomNavBar from "../../components/customNavbar";
import { getAllCities } from "../../services/other";
import City from "./city";

function Home() {
  const [cities, setCities] = useState([])

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    const result = await getAllCities()

    if (result['status'] === "success") {
      toast.success("got the data");
      // console.log(result.data);
      setCities(result.data);
      console.log("cities");
      console.log(cities);
    }
  }

  return (
    <div>
      <CustomNavBar/>
      This is a Home Component

      <div>
        {cities.map((city) =>{
          return(
            <City name = {city.name}/>
          )
        })}
      </div>

    </div>
  );
};

export default Home;
