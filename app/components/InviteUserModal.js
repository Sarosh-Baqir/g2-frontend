import { useState } from "react";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

export default function InviteUserModal({ closeModal, setSentInvitations }) {
  const [email, setEmail] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/agencies/invite", {
        recipient_email: email,
        agency_name: agencyName,
      });

      const newInvitation = response.data.newInvitation;
      console.log(newInvitation);
      setSentInvitations((prevInvitations) => [
        ...prevInvitations,
        newInvitation,
      ]);

      toast.success("Invitation sent successfully!");
      closeModal();
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast.error("Failed to send invitation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-lg w-1/3">
        <h2 className="text-xl text-[#0077B5] font-bold mb-4">Invite a User</h2>
        <form onSubmit={handleInviteSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Agency Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-start mt-4 space-x-4">
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-[#0077B5] text-white ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#005B7F]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Invitation"}
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
