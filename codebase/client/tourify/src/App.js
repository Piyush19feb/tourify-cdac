import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerLogin from "./pages/customer/login";
import CustomerRegister from "./pages/customer/register";
import Home from "./pages/home/home";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
      </Routes>

      <ToastContainer
        // position="bottom-center"
        position="top-right"
        theme="dark"
        autoClose={4000}
      />
    </div>
  );
}

export default App;
