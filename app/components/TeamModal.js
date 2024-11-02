"use client";
import React, { useState } from "react";
import axios from "axios";

const TeamModal = ({ isOpen, closeModal, fetchTeams }) => {
  const [teamName, setTeamName] = useState("");
  const [agencyId, setAgencyId] = useState("");
  const [teamLeadId, setTeamLeadId] = useState("");
  const [members, setMembers] = useState([{ email: "" }]);

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index].email = value;
    setMembers(newMembers);
  };

  const addMemberInput = () => {
    setMembers([...members, { email: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teamData = {
        team_name: teamName,
        agency_id: agencyId,
        team_lead_user_id: teamLeadId,
        members: members.map((member) => member.email).filter((email) => email),
      };
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/teams/create-team",
        teamData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTeams();
      closeModal();
      alert("Team created successfully!");
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Error creating team:", error);
    }
  };

  const handleCloseModal = () => {
    setTeamName("");
    setAgencyId("");
    setTeamLeadId("");
    setMembers([{ email: "" }]);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50 cursor-pointer"
        onClick={handleCloseModal}
      />
      <div className="bg-white rounded-lg shadow-lg p-8 z-10 w-1/3">
        <h2 className="text-2xl text-[#0077B5] font-bold mb-4">Create Team</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black mb-1">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-1">Agency ID</label>
            <input
              type="text"
              value={agencyId}
              onChange={(e) => setAgencyId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-1">Team Lead User ID</label>
            <input
              type="text"
              value={teamLeadId}
              onChange={(e) => setTeamLeadId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-1">Members Emails</label>
            {members.map((member, index) => (
              <input
                key={index}
                type="email"
                value={member.email}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Member Email"
                required
              />
            ))}
            <button
              type="button"
              onClick={addMemberInput}
              className="text-[#0077B5] hover:underline"
            >
              + Add Another Member
            </button>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0077B5] text-white rounded hover:bg-[#005B7F] transition duration-200"
            >
              Create Team
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="ml-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamModal;
