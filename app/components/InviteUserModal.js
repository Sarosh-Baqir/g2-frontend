"use client";

import { useState } from "react";
import axios from "axios";

export default function InviteUserModal({ closeModal }) {
  const [email, setEmail] = useState("");
  const [agencyId, setAgencyId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/agencies/invite",
        {
          recipient_email: email,
          agency_id: agencyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Invitation sent successfully!");
      closeModal();
    } catch (error) {
      console.error("Error sending invitation:", error);
      alert("Failed to send invitation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-lg w-1/3">
        <h2 className="text-xl text-[#0077B5] font-bold mb-4">Invite a User</h2>
        <form onSubmit={handleInviteSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Agency ID</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={agencyId}
              onChange={(e) => setAgencyId(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-start mt-4 space-x-4">
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-[#0077B5] text-white ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#005B7F]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Invitation"}
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
