import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomNavBar from "../../components/customNavbar";
import { getAllCities } from "../../services/other";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import City from "../home/city";

function Dashboard() {
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    const result = await getAllCities();

    if (result["status"] === "success") {
      toast.success("got the data");
      // console.log(result.data);
      setCities(result.data);
      console.log("cities");
      console.log(cities);
    }
  };

  const customerLogin = () => {
    navigate("/customer/login");
  };

  const customerRegister = () => {
    navigate("/customer/register");
  };

  const ownerLogin = () => {
    navigate("/owner/login");
  };

  const ownerRegister = () => {
    navigate("/owner/register");
  };

  const adminLogin = () => {
    navigate("/admin/login");
  };
  return (
    <div>
      <CustomNavBar />
      <div>
        {cities.map((city) => {
          return <City name={city.name} />;
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <CardGroup>
          <Card className="ms-5">
            <CardImg
              alt="Card image cap"
              src="https://picsum.photos/318/180"
              top
            />
            <CardBody>
              <CardTitle tag="h5">Customer</CardTitle>
              {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
                Card subtitle
              </CardSubtitle> */}
              {/* <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </CardText> */}
              <Button color="info" onClick={customerRegister}>
                Register
              </Button>
              <Button color="success" className="ms-2" onClick={customerLogin}>
                Login
              </Button>
            </CardBody>
          </Card>

          <Card className="ms-5">
            <CardImg
              alt="Card image cap"
              src="https://picsum.photos/318/180"
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">Property Owner</CardTitle>
              <Button color="info" onClick={ownerRegister}>
                Register
              </Button>
              <Button color="success" className="ms-2" onClick={ownerLogin}>
                Login
              </Button>
            </CardBody>
          </Card>

          <Card className="ms-5 me-5">
            <CardImg
              alt="Card image cap"
              src="https://picsum.photos/318/180"
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">Admin</CardTitle>
              <Button color="success" className="ms-2" onClick={adminLogin}>
                Login
              </Button>
            </CardBody>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
}

export default Dashboard;
