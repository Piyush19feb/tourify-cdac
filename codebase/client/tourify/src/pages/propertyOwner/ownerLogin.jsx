import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/customer";
import "../../css/customer/login.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ownerLogin } from "../../services/owner";

const OwnerLogin = () => {
  // create state members
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for navigation purpose (where do we want to redirect user after successfull login)
  const navigate = useNavigate();

  const onCancel = () => {
    navigate("/home");
  };

  const onLogin = async () => {
    // client side validation
    if (email.length === 0) {
      toast.warning("enter email");
    } else if (password.length === 0) {
      toast.warning("enter password");
    } else {
      const result = await ownerLogin(email, password);
      if (result.status === "success") {
        const token = result.data.token;
        const name = result.data.name;

        localStorage.setItem("token", token);
        localStorage.setItem("name", name);

        toast.success("welcome to the application");
        navigate("/home");
      } else {
        toast.error("Invalid email or password !!");
      }
    }
  };

  return (
    <div>
      <Container>
        <Row className="mt-5">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader className="text-center">
                <h3>Login (Property Owner)</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={onLogin}>
                  {/* for email field */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="Enter email here"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </FormGroup>

                  {/* for password field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter password here"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button onClick={onLogin} color="primary" outline>
                      Login
                    </Button>
                    <Button
                      onClick={onCancel}
                      type="reset"
                      className="ms-2"
                      color="danger"
                      outline
                    >
                      Cancel
                    </Button>
                    <br />
                    <br />
                    <label> Not registered yet?</label>
                    <br />
                    <Link className="ms-3" to={"/owner/register"}>
                      Register Now
                    </Link>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OwnerLogin;
