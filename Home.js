// src/pages/Home.js

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Make sure to set up AuthContext
import { fetchUsers, claimPoints } from "../services/apiService"; // Helper functions for API calls
import UserCard from "../components/UserCard"; // A component for displaying user details
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]); // State for storing users
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useContext(AuthContext); // Get the current logged-in user info from Context API
  const navigate = useNavigate();

  // Fetch initial list of users
  useEffect(() => {
    async function loadUsers() {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  // Handler for claiming points
  const handleClaimPoints = async (userId) => {
    try {
      const updatedUser = await claimPoints(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.firstName}!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.slice(0, 10).map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onClaimPoints={() => handleClaimPoints(user._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
