import { Route, Routes } from "react-router-dom";
import { Login, Register, Home, ForgotPassword } from "../pages";
import { ProtectedRoute } from "../components";

// Component for defining protected routes
const ProtectedRoutes = () => {
  return (
    <>
      {/* Protected route for the Home component */}
      <ProtectedRoute path="/" element={<Home />} />
    </>
  );
};

// Component for defining all routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes for protected pages */}
      <Route element={<ProtectedRoutes />} />

      {/* Routes for public pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AppRoutes;
