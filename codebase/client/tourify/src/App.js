import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLogin from "./pages/admin/adminLogin";
import OwnerLogin from "./pages/propertyOwner/ownerLogin";
import OwnerRegister from "./pages/propertyOwner/ownerRegister";
import Home from "./pages/home/home";
import Footer from "./components/footer/footer";
import SignUpCard from "./pages/signUpCard/signUpCard";
import Dashboard from "./pages/dashboard/dashboard";
import PropertyHome from "./pages/propertyHome/propertyHome";
import CustomerLogin from "./pages/customer/login/customerLogin";
import CustomerRegister from "./pages/customer/register/customerRegister";
import PropertyDetails from "./pages/customer/propertyDetails/propertyDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpCard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route
          path="/customer/properties/:cityName"
          element={<PropertyHome />}
        />
        <Route
          path="/customer/propertydetails/:city/:id"
          element={<PropertyDetails />}
        />

        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/register" element={<OwnerRegister />} />

        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>

      <ToastContainer
        // position="bottom-center"
        position="top-right"
        theme="dark"
        autoClose={4000}
      />

      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
