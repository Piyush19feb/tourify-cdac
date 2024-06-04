import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllPropsInCity } from "../../services/properties";
import Property from "./property";
import "./propertyList.css";

const PropertyList = (city) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadProperties();
  });

  const loadProperties = async () => {
    const result = await getAllPropsInCity(city);
    if (result["status"] === "success") {
      setProperties(result["data"]);
    } else {
      toast.error(result["error"]);
    }
  };

  return (
    <div>
      <div className="myDiv">
        {properties.map((property) => {
          return <Property property={property} />;
        })}
      </div>
    </div>
  );
};

export default PropertyList;
