"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AssignAdminModal from "../../components/AssignAdminModal";
import AddAgencyModal from "../../components/AddAgencyModal";
import EditAgencyModal from "../../components/EditAgencyModal";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

const Agencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [error, setError] = useState(null);
  const [assignAdminAgencyId, setAssignAdminAgencyId] = useState(null);
  const [isAssignAdminModalOpen, setIsAssignAdminModalOpen] = useState(false);
  const [isEditAgencyModalOpen, setIsEditAgencyModalOpen] = useState(false);
  const [isAddAgencyModalOpen, setIsAddAgencyModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agencyId, setAgencyId] = useState(null);
  const router = useRouter();

  const openDetailsPage = (agencyId) => {
    router.push(`/dashboard/agencies/${agencyId}`);
  };

  useEffect(() => {
    const fetchAgencies = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/agencies");

        if (response.status === 200) {
          setAgencies(response.data);
          toast.success("Agencies fetched successfully!");
        }
      } catch (err) {
        toast(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgencies();
  }, []);

  const addAgency = (newAgency) => {
    setAgencies((prevAgencies) => [...prevAgencies, newAgency]);
  };

  const editAgency = (updatedAgency) => {
    setAgencies((prevAgencies) =>
      prevAgencies.map((agency) =>
        agency.agency_id === updatedAgency.agency_id
          ? { ...agency, agency_name: updatedAgency.agency_name }
          : agency
      )
    );
  };

  const handleAssignAdmin = (id) => {
    setAssignAdminAgencyId(id);
    setIsAssignAdminModalOpen(true);
  };

  const closeAssignAdminModal = () => {
    setIsAssignAdminModalOpen(false);
    setAssignAdminAgencyId(null);
  };

  const openAddAgencyModal = () => {
    setIsAddAgencyModalOpen(true);
  };

  const closeAddAgencyModal = () => {
    setIsAddAgencyModalOpen(false);
  };

  const openEditAgencyModal = (agency_id) => {
    setAgencyId(agency_id);
    setIsEditAgencyModalOpen(true);
  };

  const closeEditAgencyModal = () => {
    setIsEditAgencyModalOpen(false);
    setAgencyId(null);
  };

  const deleteAgency = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this agency?");
    if (!confirmed) return;
    // Optimistically update the UI
    setAgencies((prevAgencies) =>
      prevAgencies.filter((agency) => agency.agency_id !== id)
    );

    try {
      const response = await axiosInstance.post("/agencies/delete", {
        agencyId: id,
      });

      toast.success("Agency has been deleted successfully!");

      setAgencies((prevAgencies) =>
        prevAgencies.filter((agency) => agency.agency_id !== id)
      );
      setError("");
    } catch (err) {
      toast.error("Failed to delete an agency");
      setError(err.message);
    }
  };

  const updateTotalAdmins = (agencyId) => {
    setAgencies((prevAgencies) =>
      prevAgencies.map((agency) =>
        agency.agency_id === agencyId
          ? { ...agency, total_admins: agency.total_admins + 1 }
          : agency
      )
    );
  };

  return (
    <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-[#0077B5] font-bold text-center flex-grow">
            AGENCIES LISTING
          </h1>
          <button
            onClick={openAddAgencyModal}
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
                <th className="py-3 px-6 text-center">Agency Name</th>
                <th className="py-3 px-6 text-center">Admins</th>
                <th className="py-3 px-6 text-center">Total Members</th>
                <th className="py-3 px-6 text-center">Assign Admin</th>
                <th className="py-3 px-6 text-center">View</th>
                <th className="py-3 px-6 text-center">Edit</th>
                <th className="py-3 px-6 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((agency) => (
                <tr
                  key={agency.agency_id}
                  className="hover:bg-gray-100 text-black border-b border-gray-200"
                >
                  <td className="py-3 px-6 text-center">
                    {agency.agency_name}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {agency.total_admins}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {agency.total_members}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-[#0077B5] text-white px-4 py-1 rounded"
                      onClick={() => handleAssignAdmin(agency.agency_id)}
                    >
                      Assign
                    </button>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-green-500 text-white px-4 py-1 rounded"
                      onClick={() => openDetailsPage(agency.agency_id)}
                    >
                      VIEW
                    </button>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-yellow-500 text-white px-4 py-1 rounded"
                      onClick={() => openEditAgencyModal(agency.agency_id)}
                    >
                      EDIT
                    </button>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => deleteAgency(agency.agency_id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Agency Modal */}
      <AddAgencyModal
        isOpen={isAddAgencyModalOpen}
        onClose={closeAddAgencyModal}
        onAddAgency={addAgency}
      />

      {/* Edit Agency Modal */}
      <EditAgencyModal
        isOpen={isEditAgencyModalOpen}
        onClose={closeEditAgencyModal}
        agencyId={agencyId}
        onEditAgency={editAgency}
      />

      {/* Assign Admin Modal */}
      <AssignAdminModal
        isOpen={isAssignAdminModalOpen}
        onClose={closeAssignAdminModal}
        agencyId={assignAdminAgencyId}
        updateTotalAdmins={updateTotalAdmins}
      />
    </div>
  );
};

export default Agencies;
