"use client";

import { useEffect, useState } from "react";
import AssignAdminModal from "./AssignAdminModal";

const AgencyList = () => {
  const [agencies, setAgencies] = useState([]);
  const [error, setError] = useState(null);
  const [newAgencyName, setNewAgencyName] = useState("");
  const [assignAdminAgencyId, setAssignAdminAgencyId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAgencies = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/api/agencies", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch agencies");
        }

        const data = await response.json();
        setAgencies(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAgencies();
  }, []);

  const handleCreateAgency = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/agencies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ agency_name: newAgencyName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create agency");
      }

      const newAgency = await response.json();
      setAgencies((prevAgencies) => [...prevAgencies, newAgency[0]]);
      setNewAgencyName("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAssignAdmin = (id) => {
    setAssignAdminAgencyId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAssignAdminAgencyId(null);
  };

  return (
    <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-[#0077B5] mb-4">Your Agencies</h2>

      {/* Error Handling */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* List of Agencies */}
      <ul className="space-y-4">
        {agencies.map((agency) => (
          <li
            key={agency.agency_id}
            className="bg-gray-100 text-black p-4 rounded-lg shadow flex justify-between items-center transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="flex-1 font-semibold">{agency.agency_name}</h3>
            <button
              className="bg-[#0077B5] text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-[#005B7F]"
              onClick={() => handleAssignAdmin(agency.agency_id)}
            >
              Assign Admin
            </button>
          </li>
        ))}
      </ul>

      {/* Form to create a new agency */}
      <form onSubmit={handleCreateAgency} className="mt-6">
        <input
          type="text"
          value={newAgencyName}
          onChange={(e) => setNewAgencyName(e.target.value)}
          placeholder="New Agency Name"
          className="border border-gray-300 p-2 rounded-lg mb-4 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-[#0077B5] text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-[#005B7F]"
        >
          Add Agency
        </button>
      </form>

      {/* Assign Admin Modal */}
      <AssignAdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        agencyId={assignAdminAgencyId}
      />
    </div>
  );
};

export default AgencyList;
