import { useState } from "react";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

const EditTeamModal = ({ isOpen, onClose, teamId, onEditTeam }) => {
  const [newTeamName, setNewTeamName] = useState("");
  const [error, setError] = useState("");

  const handleEditTeam = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/teams/edit", {
        team_name: newTeamName,
        team_id: teamId,
      });

      const newTeam = response.data;
      toast.success("Team edited successfully");
      onEditTeam({ team_id: teamId, team_name: newTeamName });

      setNewTeamName("");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to edit team");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-[#0077B5] font-bold mb-4">
          Add New Team Name
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleEditTeam}>
          <input
            type="text"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            placeholder="New Team Name"
            className="border text-black border-gray-300 p-2 rounded-lg mb-4 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0077B5] text-white px-4 py-2 rounded-md"
            >
              Edit Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeamModal;
