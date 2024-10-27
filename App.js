// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
            <Route path="/leaderboard" element={<ProtectedRoute component={Leaderboard} />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to Login for undefined routes */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

// Protected route wrapper
const ProtectedRoute = ({ component: Component }) => {
  const { user } = React.useContext(AuthProvider);

  return user ? <Component /> : <Navigate to="/login" />;
};

export default App;
