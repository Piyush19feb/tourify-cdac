const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const config = require("./config");
const utils = require("./utils");

const app = express();

app.use(cors());
app.use(express.json());

// middleware to verify the token
app.use((request, response, next) => {
  // check if token is required for the API
  if (
    request.url === "/api/user/login" ||
    request.url === "/api/user/register" ||
    request.url === "/api/owner/login" ||
    request.url === "/api/owner/register" ||
    request.url === "/api/admin/register" ||
    request.url === "/api/admin/login"
  ) {
    // skip verifying the token
    next();
  } else {
    // get the token
    const token = request.headers["token"];

    if (!token || token.length === 0) {
      response.send(utils.createErrorResult("missing token"));
    } else {
      try {
        // verify the token
        const payload = jwt.verify(token, config.secret);

        // add the user Id to the request
        request.userId = payload["id"];

        // call the real route
        next();
      } catch (ex) {
        response.send(utils.createErrorResult("invalid token"));
      }
    }
  }
});

// add the routes
const userRouter = require("./routes/user");
const placeRouter = require("./routes/place");
const ownerRouter = require("./routes/owner");
const adminRouter = require("./routes/admin");
const propertiesRouter = require("./routes/properties");
const bookingRouter = require("./routes/booking");

app.use("/api/user", userRouter);
app.use("/api/place", placeRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/booking", bookingRouter);

app.listen(4000, "0.0.0.0", () => {
  console.log(`server started on port 4000`);
});
