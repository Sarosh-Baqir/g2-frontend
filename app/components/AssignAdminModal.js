import React, { useState } from "react";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

const AssignAdminModal = ({ isOpen, onClose, agencyId, updateTotalAdmins }) => {
  const [userEmail, setUserEmail] = useState("");
  const handleAssignAdmin = () => {
    axiosInstance
      .post("/users/assign-admin", {
        agency_id: agencyId,
        user_email: userEmail,
      })
      .then((response) => {
        toast.success("Admin assigned successfully");
        setUserEmail("");
        onClose();
        updateTotalAdmins(agencyId);
      })
      .catch((err) => {
        console.error("Error assigning admin:", err);
        toast.error(error.response?.data?.message || "Error assigning admin");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg text-[#0077B5] font-semibold mb-4">
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
            className="bg-[#0077B5] text-white px-4 py-2 rounded-lg transition-all duration-200"
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
