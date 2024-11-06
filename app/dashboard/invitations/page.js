"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/apiClient";
import InviteUserModal from "@/app/components/InviteUserModal";
import { toast } from "react-toastify";

const Invitations = () => {
  const [sentInvitations, setSentInvitations] = useState([]);
  const [receivedInvitations, setReceivedInvitations] = useState([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const openInviteModal = () => setIsInviteModalOpen(true);
  const closeInviteModal = () => setIsInviteModalOpen(false);

  useEffect(() => {
    axiosInstance
      .get("/agencies/invitations/sent")
      .then((response) => {
        toast.success("sent invitation has been fetched successfully");
        setSentInvitations(response.data.invitations);
      })
      .catch((err) => {
        console.error("Error fetching sent invitations:", err);
        toast.error("Error fetching sent invitations");
      });

    axiosInstance
      .get("/agencies/invitations/received")
      .then((response) => {
        if (response.status == 200) {
          toast.success("Received Invitations has been fetched successfully");
        } else {
          toast.warning(response.data.message);
        }

        setReceivedInvitations(response.data.invitations);
      })
      .catch((err) => {
        console.error("Error fetching received invitations:", err);
      });
  }, []);

  const handleAction = (invitationId, action) => {
    axiosInstance
      .post("/agencies/invitations/respond", {
        invitation_id: invitationId,
        response: action,
      })
      .then((response) => {
        toast.success(`Invitation ${action}ed successfully.`);
        setReceivedInvitations((prevInvitations) =>
          prevInvitations.map((invitation) =>
            invitation.invitation_id === invitationId
              ? { ...invitation, status: action }
              : invitation
          )
        );
        //alert(`Invitation ${action}ed successfully.`);
      })
      .catch((err) => {
        console.error(`Error while ${action}ing the invitation:`, err);
      });
  };

  const cancelAction = (invitationId) => {
    axiosInstance
      .post("/agencies/deleteInvitation", {
        invitation_id: invitationId,
      })
      .then((response) => {
        setSentInvitations((prevInvitations) => [
          ...prevInvitations.filter(
            (invitation) => invitation.invitation_id !== invitationId
          ),
        ]);
        console.log("Updated Invitations:", sentInvitations);
        toast.success("Invitation cancelled successfully.");
      })
      .catch((err) => {
        console.error("Error while canceling the invitation:", err);
      });
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl text-[#0077B5] font-bold text-center flex-grow">
          INVITATIONS LISTING
        </h1>
        <button
          onClick={openInviteModal}
          className="bg-[#0077B5] text-white px-4 py-2 rounded font-semibold hover:bg-[#005f8a]"
        >
          Invite
        </button>
      </div>

      {/* Received Invitations */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-black mb-4">
          Received Invitations
        </h3>
        {receivedInvitations.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border-b text-black px-4 py-2 text-left">
                  From
                </th>
                <th className="border-b text-black px-4 py-2 text-left">
                  Agency
                </th>
                <th className="border-b text-black px-4 py-2 text-left">
                  Status
                </th>
                <th className="border-b text-black px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {receivedInvitations.map((invitation) => (
                <tr
                  key={invitation.invitation_id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="px-4 py-2 text-black break-words">
                    {invitation.sender_email}
                  </td>
                  <td className="px-4 py-2 text-black break-words">
                    {invitation.agency_name}
                  </td>
                  <td className="px-4 py-2 text-black break-words">
                    {invitation.status}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        className={`bg-green-500 text-white px-4 py-1 rounded transition duration-200 ${
                          invitation.status !== "pending"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          handleAction(invitation.invitation_id, "accepted")
                        }
                        disabled={invitation.status !== "pending"}
                      >
                        Accept
                      </button>
                      <button
                        className={`bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition duration-200 ${
                          invitation.status !== "pending"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          handleAction(invitation.invitation_id, "rejected")
                        }
                        disabled={invitation.status !== "pending"}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No received invitations.</p>
        )}
      </div>

      {/* Sent Invitations */}
      <div>
        <h3 className="text-2xl text-black font-semibold mb-4">
          Sent Invitations
        </h3>
        {sentInvitations.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border-b text-black px-4 py-2 text-left">To</th>
                <th className="border-b text-black px-4 py-2 text-left">
                  Agency
                </th>
                <th className="border-b text-black px-4 py-2 text-left">
                  Status
                </th>
                <th className="border-b text-black px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(sentInvitations) && sentInvitations.length > 0 ? (
                sentInvitations.map(
                  (invitation) =>
                    invitation ? ( // Check if invitation is defined
                      <tr
                        key={invitation.invitation_id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="px-4 py-2 text-black break-words">
                          {invitation.recipient_email || "N/A"}{" "}
                          {/* Fallback to N/A if undefined */}
                        </td>
                        <td className="px-4 py-2 text-black break-words">
                          {invitation.agency_name || "N/A"}{" "}
                          {/* Fallback to N/A if undefined */}
                        </td>
                        <td className="px-4 py-2 text-black break-words">
                          {invitation.status || "N/A"}{" "}
                          {/* Fallback to N/A if undefined */}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            className={`bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition duration-200 ${
                              invitation.status === "accepted"
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() =>
                              cancelAction(invitation.invitation_id)
                            }
                            disabled={invitation.status === "accepted"}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : null // Render nothing if invitation is not valid
                )
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-black text-center">
                    No invitations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No sent invitations.</p>
        )}
      </div>
      {isInviteModalOpen && (
        <InviteUserModal
          closeModal={closeInviteModal}
          setSentInvitations={setSentInvitations}
        />
      )}
    </div>
  );
};

export default Invitations;
