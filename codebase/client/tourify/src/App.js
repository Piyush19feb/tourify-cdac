import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerLogin from "./pages/customer/customerLogin";
import CustomerRegister from "./pages/customer/customerRegister";
import AdminLogin from "./pages/admin/adminLogin";
import OwnerLogin from "./pages/propertyOwner/ownerLogin";
import OwnerRegister from "./pages/propertyOwner/ownerRegister";
import Home from "./pages/home/home";
import Footer from "./components/footer/footer";
import SignUpCard from "./pages/signUpCard/signUpCard";
import Dashboard from "./pages/dashboard/dashboard";

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
