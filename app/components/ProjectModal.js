import React, { useState } from "react";
import axios from "axios";

const ProjectModal = ({ isOpen, closeModal, fetchProjects }) => {
  const [projectName, setProjectName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/projects/create-project",
        {
          project_name: projectName,
          assigned_team_id: selectedTeamId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        }

        closeModal();
        fetchProjects();
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
          alert(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          console.error("Error request:", error.request);
          alert("No response from the server. Please try again later.");
        } else {
          console.error("Error in setting up request:", error.message);
          alert(`Request error: ${error.message}`);
        }
      });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-[#0077B5] font-semibold mb-4">
            Create Project
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black text-sm font-semibold">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full border text-black px-2 py-1 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm font-semibold">
                Team Id
              </label>
              <input
                type="text"
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                className="w-full border text-black px-2 py-1 rounded"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#0077B5] text-white rounded hover:bg-[#005582]"
              >
                Create
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
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
