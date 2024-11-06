import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

const ProjectModal = ({ isOpen, closeModal, fetchProjects }) => {
  const [projectName, setProjectName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedAgencyId, setSelectedAgencyId] = useState("");
  const [agencies, setAgencies] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchAgencies = async () => {
      try {
        const response = await axiosInstance.get("/agencies/adminAgencies");
        setAgencies(response.data);
        console.log("Fetched agencies:", response.data);
      } catch (err) {
        console.error("Error fetching agencies:", err);
      }
    };

    fetchAgencies();
  }, [isOpen]);

  const handleAgencyChange = async (e) => {
    const agencyId = e.target.value;
    setSelectedAgencyId(agencyId);
    setSelectedTeamId("");

    // Fetch teams for the selected agency
    try {
      const response = await axiosInstance.get(`/teams/agency/${agencyId}`);
      setTeams(response.data);
      console.log("Fetched teams:", response.data);
    } catch (err) {
      console.error("Error fetching teams:", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/projects/create-project", {
        project_name: projectName,
        assigned_team_id: selectedTeamId,
      });

      if (response.data.message) {
        toast.success(response.data.message);
      }

      closeModal();
      fetchProjects();
    } catch (error) {
      toast.error("Failed to create a project");
    }
  };
  const handleCloseModal = () => {
    setProjectName("");
    setSelectedTeamId("");
    setSelectedAgencyId("");
    setTeams([]);
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl text-[#0077B5] font-semibold mb-6 text-center">
            Create Project
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black text-sm font-semibold mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full border text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0077B5] transition duration-200"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm font-semibold mb-1">
                Select Agency
              </label>
              <select
                value={selectedAgencyId}
                onChange={handleAgencyChange}
                className="w-full border text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0077B5] transition duration-200"
                required
              >
                <option value="">Select an agency</option>
                {agencies.map((agency) => (
                  <option key={agency.agency_id} value={agency.agency_id}>
                    {agency.agency_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm font-semibold mb-1">
                Select Team
              </label>
              <select
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                className="w-full border text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0077B5] transition duration-200"
                required
                disabled={!selectedAgencyId} // Disable if no agency is selected
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.team_id} value={team.team_id}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-[#0077B5] text-white rounded hover:bg-[#005582] transition duration-200"
              >
                Create
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="ml-4 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ProjectModal;
