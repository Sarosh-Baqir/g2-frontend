"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamModal from "./TeamModal";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/teams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeams(response.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      alert("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-[#0077B5] font-bold mb-4">Your Teams</h1>
      <p className="text-gray-800 mb-6">
        Teams either created by you or in which you are a member.
      </p>
      {teams.length > 0 ? (
        <ul className="space-y-4">
          {teams.map((team) => (
            <li
              key={team.team_id}
              className="p-5 border border-gray-300 rounded-lg shadow-md bg-white transition-transform duration-200 transform hover:scale-105"
            >
              <div className="flex flex-col mb-2">
                <h2 className="text-2xl text-[#0077B5] font-bold">
                  Team Name: {team.team_name}
                </h2>
                <p className="text-gray-700">
                  <strong>Agency:</strong> {team.agency_name}
                </p>
              </div>

              <div className="mt-2">
                <h3 className="text-lg text-gray-800 font-semibold">
                  Members:
                </h3>
                {team.members.length > 0 ? (
                  <ul className="list-disc ml-5 mt-1">
                    {team.members.map((user) => (
                      <li key={user.user_id} className="py-1 text-gray-800">
                        {user.name} ({user.email})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No members in this team</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No teams available</p>
      )}
      <button
        onClick={openModal}
        className="mt-6 px-5 py-2 bg-[#0077B5] text-white rounded-lg shadow-lg transition-all duration-200 hover:bg-[#005B7F]"
      >
        Create Team
      </button>

      <TeamModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        fetchTeams={fetchTeams}
      />
    </div>
  );
};

export default Teams;
