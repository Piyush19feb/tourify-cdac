import React, { useEffect, useState } from "react";
import AfterLoginNavbar from "../../../components/afterLoginNavbar/afterLoginNavbar";
import { getPropertyFromCity } from "../../../services/properties";
import { toast } from "react-toastify";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import "./propertyDetails.css";
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const PropertyDetails = () => {
  const [property, setProperty] = useState();
  const navigate = useNavigate();

  const { city, id } = useParams();

  useEffect(() => {
    loadProperty();
  }, []);

  const loadProperty = async () => {
    const result = await getPropertyFromCity(city, id);
    console.log("propertydetails page: ", city, id);
    if (result["status"] === "success" && result.data.length === 1) {
      setProperty(result["data"][0]);
      // console.log(result["data"][0]);
    } else {
      toast.error(result["error"]);
    }
  };

  return (
    <>
      <AfterLoginNavbar />
      
      {/* <center>
        <h1>This is property Details page</h1>
      </center>
      {property?.title} */}

      <center>
        <div className="myDiv">
          <MDBCard className="mb-3">
            <MDBCardImage
              className="myImg"
              position="top"
              src={property?.img}
              alt="..."
            />
            <MDBCardBody>
              <MDBCardTitle>{property?.title}</MDBCardTitle>
              <MDBCardText>{property?.description}</MDBCardText>
              <MDBCardText>{property?.address}</MDBCardText>
              <MDBCardText>{property?.rate}</MDBCardText>
              <MDBCardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </MDBCardText>
              <div>
                <Button
                  color="dark"
                  outline
                  onClick={() => {
                    navigate("/customer/book");
                  }}
                >
                  Book Now
                </Button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      </center>
    </>
  );
};

export default PropertyDetails;
