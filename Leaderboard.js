// src/pages/Leaderboard.js

import React, { useEffect, useState } from "react";
import { fetchUsers, fetchUserHistory } from "../services/apiService"; // API service functions
import Modal from "../components/Modal"; // A Modal component for showing history

const Leaderboard = () => {
  const [users, setUsers] = useState([]); // State for user list
  const [selectedUser, setSelectedUser] = useState(null); // User whose history is displayed
  const [userHistory, setUserHistory] = useState([]); // Points history of selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch users for leaderboard
  useEffect(() => {
    async function loadUsers() {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers.sort((a, b) => b.points - a.points)); // Sort users by points
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  // Fetch user history when a user is selected
  const handleUserClick = async (userId) => {
    try {
      const history = await fetchUserHistory(userId);
      setUserHistory(history);
      setSelectedUser(userId);
      setIsModalOpen(true); // Open modal
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Rank</th>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="px-6 py-4 border-b">{index + 1}</td>
                <td className="px-6 py-4 border-b">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4 border-b">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Points History</h2>
          <ul>
            {userHistory.map((entry, index) => (
              <li key={index} className="mb-2">
                {entry.date}: {entry.points} points
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Leaderboard;
