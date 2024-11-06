import { useState } from "react";
import axiosInstance from "../../lib/apiClient";
import { toast } from "react-toastify";

const EditAgencyModal = ({ isOpen, onClose, agencyId, onEditAgency }) => {
  const [newAgencyName, setNewAgencyName] = useState("");
  const [error, setError] = useState("");

  const handleCreateAgency = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/agencies/edit", {
        agency_name: newAgencyName,
        agency_id: agencyId,
      });

      if (response.status === 200) {
        toast.success("Agency data edited successfully!");
        onEditAgency({ agency_id: agencyId, agency_name: newAgencyName });
        setNewAgencyName("");
        onClose();
      } else {
        throw new Error("Failed to edit agency");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to edit agency ", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-[#0077B5] font-bold mb-4">
          Add New Agency Name
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleCreateAgency}>
          <input
            type="text"
            value={newAgencyName}
            onChange={(e) => setNewAgencyName(e.target.value)}
            placeholder="New Agency Name"
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
              Edit Agency
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAgencyModal;
