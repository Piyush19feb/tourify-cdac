import React from "react";
import PropertyList from "../../components/properties/propertyList";
import AfterLoginNavbar from "../../components/afterLoginNavbar/afterLoginNavbar";

const PropertyHome = () => {
  return (
    <div>
      <AfterLoginNavbar />
      <PropertyList />
    </div>
  );
};

export default PropertyHome;
