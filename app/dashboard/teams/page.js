"use client";
import React, { useEffect, useState } from "react";
import TeamModal from "../../components/TeamModal";
import { useRouter } from "next/navigation";
import EditTeamModal from "../../components/EditTeamModal";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
  const router = useRouter();
  // Function to fetch teams
  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/teams");
      toast.success("Teams fetched successfully");
      setTeams(response.data.teams);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching teams:", err);
      setIsLoading(false);
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

  const navigateToDetailsPage = (id) => {
    router.push(`/dashboard/teams/${id}`);
  };

  const editTeam = (updatedTeam) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.team_id === updatedTeam.team_id
          ? { ...team, team_name: updatedTeam.team_name }
          : team
      )
    );
  };
  const openEditTeamModal = (team_id) => {
    setTeamId(team_id);
    setIsEditTeamModalOpen(true);
  };

  const closeEditTeamModal = () => {
    setIsEditTeamModalOpen(false);
    setTeamId(null);
  };

  // Function to delete team
  const deleteTeam = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this Team?");
    if (!confirmed) return;
    const previousTeams = teams;
    try {
      const response = await axiosInstance.post("/teams/delete", {
        teamId: id,
      });

      if (response.status !== 200) {
        throw new Error("Failed to delete team");
      }
      toast.success("Team deleted successfully");

      setTeams(previousTeams.filter((team) => team.team_id !== id));
    } catch (err) {
      setTeams(previousTeams);
      console.error(err);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-[#0077B5] font-bold text-center flex-grow">
            TEAMS LISTING
          </h1>
          <button
            onClick={openModal}
            className="bg-[#0077B5] text-white px-4 py-2 rounded font-semibold hover:bg-[#005f8a]"
          >
            Create
          </button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#0077B5] text-white text-left">
                <th className="py-3 px-6 text-center">Team Name</th>
                <th className="py-3 px-6 text-center">Agency Name</th>
                <th className="py-3 px-6 text-center">Total Members</th>
                <th className="py-3 px-6 text-center">View</th>
                <th className="py-3 px-6 text-center">Edit</th>
                <th className="py-3 px-6 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {teams?.length === 0 || !teams ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-3 px-6 text-center text-gray-500"
                  >
                    No teams found
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr
                    key={team.team_id}
                    className="hover:bg-gray-100 text-black border-b border-gray-200"
                  >
                    <td className="py-3 px-6 text-center">{team.team_name}</td>
                    <td className="py-3 px-6 text-center">
                      {team.agency_name}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {team.members.length}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded"
                        onClick={() => navigateToDetailsPage(team.team_id)} // Pass the team data here
                      >
                        VIEW
                      </button>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        className="bg-yellow-500 text-white px-4 py-1 rounded"
                        onClick={() => openEditTeamModal(team.team_id)}
                      >
                        EDIT
                      </button>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => deleteTeam(team.team_id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <TeamModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        fetchTeams={fetchTeams}
      />

      {/* Edit Agency Modal */}
      <EditTeamModal
        isOpen={isEditTeamModalOpen}
        onClose={closeEditTeamModal}
        teamId={teamId}
        onEditTeam={editTeam}
      />
    </div>
  );
};

export default Teams;
