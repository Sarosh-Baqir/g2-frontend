import React, { useState } from "react";
import axios from "axios";

const AssignAdminModal = ({ isOpen, onClose, agencyId }) => {
  const [userEmail, setUserEmail] = useState("");

  const handleAssignAdmin = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:5000/api/users/assign-admin",
        { agency_id: agencyId, user_email: userEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        setUserEmail("");
        onClose();
      })
      .catch((error) => {
        console.error("Error assigning admin:", error);
        alert(error.response.data.message || "Error assigning admin");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg text-blue-700 font-semibold mb-4">
          Assign Admin
        </h2>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter user email"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-500"
            onClick={handleAssignAdmin}
            disabled={!userEmail}
          >
            Assign
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAdminModal;
