"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

const TeamModal = ({ isOpen, closeModal, fetchTeams }) => {
  const [teamName, setTeamName] = useState("");
  const [agencyId, setAgencyId] = useState("");
  const [teamLeadId, setTeamLeadId] = useState("");
  const [members, setMembers] = useState([{ email: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const fetchAgencies = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/agencies/adminAgencies");
        setAgencies(response.data);
        console.log("Fetched agencies:", response.data);
      } catch (err) {
        console.error("Error fetching agencies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgencies();
  }, [isOpen]);

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index].email = value;
    setMembers(newMembers);
  };

  const addMemberInput = () => {
    const lastMemberEmail = members[members.length - 1].email;
    if (lastMemberEmail.trim() === "") {
      setMessage("Previous box is empty!");
      return;
    }
    setMessage("");
    setMembers([...members, { email: "" }]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teamData = {
        team_name: teamName,
        agency_id: agencyId,
        team_lead_email: teamLeadId,
        members: members.map((member) => member.email).filter((email) => email),
      };

      const res = await axiosInstance.post("/teams/create-team", teamData);

      fetchTeams();
      closeModal();
      if (res.status === 201) {
        toast.success("Team created successfully!");
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      console.error("Error creating team:", err);
    }
  };
  const handleCloseModal = () => {
    setTeamName("");
    setAgencyId("");
    setTeamLeadId("");
    setMembers([{ email: "" }]);
    setMessage("");
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
            <label className="block text-black mb-1">Select Agency</label>
            <select
              value={agencyId}
              onChange={(e) => setAgencyId(e.target.value)}
              className="w-full p-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white cursor-pointer"
              required
            >
              <option value="" disabled>
                Select an agency
              </option>
              {agencies.map((agency) => (
                <option key={agency.agency_id} value={agency.agency_id}>
                  {agency.agency_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-black mb-1">
              Team Lead User Email
            </label>
            <input
              type="email"
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
                className={`w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  message && index === members.length - 1
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Member Email"
                required
              />
            ))}
            {message && <p className="text-red-500 text-sm">{message}</p>}
            <button
              type="button"
              onClick={addMemberInput}
              className="text-[#0077B5] hover:underline mt-2"
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
