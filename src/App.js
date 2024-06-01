import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register, Home, ForgotPassword } from "./pages";
import { ProtectedRoute } from "./components";

// Main App component with routes for all the pages.

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Protected route for Home component */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Route for Login component */}
        <Route path="/login" element={<Login />} />
        {/* Route for Register component */}
        <Route path="/register" element={<Register />} />
        {/* Route for ForgotPassword component */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
