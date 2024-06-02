import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register, Home, ForgotPassword } from "../pages";
import { ProtectedRoute } from "../components";

// Component for defining all routes
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
