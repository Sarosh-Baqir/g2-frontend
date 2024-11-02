"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Invitations = ({ openInviteModal }) => {
  const [sentInvitations, setSentInvitations] = useState([]);
  const [receivedInvitations, setReceivedInvitations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/agencies/invitations/sent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSentInvitations(response.data.invitations);
      })
      .catch((error) => {
        console.error("Error fetching sent invitations:", error);
      });

    axios
      .get("http://localhost:5000/api/agencies/invitations/received", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReceivedInvitations(response.data.invitations);
      })
      .catch((error) => {
        console.error("Error fetching received invitations:", error);
      });
  }, []);

  const handleAction = (invitationId, action) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/agencies/invitations/respond",
        {
          invitation_id: invitationId,
          response: action,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setReceivedInvitations((prevInvitations) =>
          prevInvitations.map((invitation) =>
            invitation.invitation_id === invitationId
              ? { ...invitation, status: action }
              : invitation
          )
        );
        alert(`Invitation ${action}ed successfully.`);
      })
      .catch((error) => {
        console.error(`Error while ${action}ing the invitation:`, error);
      });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-[#0077B5] font-bold mb-4">Invitations</h2>

      {/* Sent Invitations */}
      <div className="mb-6">
        <h3 className="text-xl text-black font-semibold">Sent Invitations</h3>
        {sentInvitations.length > 0 ? (
          <ul>
            {sentInvitations.map((invitation) => (
              <li
                key={invitation.invitation_id}
                className="p-4 border-b text-black"
              >
                To: {invitation.recipient_email} - Status: {invitation.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No sent invitations.</p>
        )}
      </div>

      {/* Received Invitations */}
      <div>
        <h3 className="text-xl font-semibold text-black">
          Received Invitations
        </h3>
        {receivedInvitations.length > 0 ? (
          <ul>
            {receivedInvitations.map((invitation) => (
              <li
                key={invitation.invitation_id}
                className="p-5 border-b text-black"
              >
                From: {invitation.sender_email} in Agency{" "}
                {invitation.agency_name} - Status: {invitation.status}
                <div className="mt-2">
                  {/* Conditionally render buttons based on status */}
                  {invitation.status === "pending" ? (
                    <div className="flex space-x-2">
                      <button
                        className="bg-[#0077B5] text-white px-4 py-2 rounded hover:bg-[#005B7F] transition duration-200"
                        onClick={() =>
                          handleAction(invitation.invitation_id, "accepted")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                        onClick={() =>
                          handleAction(invitation.invitation_id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      You have {invitation.status} this invitation.
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No received invitations.</p>
        )}
      </div>
      {/* "Invite User" Button */}
      <div className="text-right my-4">
        <button
          className="bg-[#0077B5] text-white px-4 py-2 rounded hover:bg-[#005B7F]"
          onClick={openInviteModal}
        >
          Invite User
        </button>
      </div>
    </div>
  );
};

export default Invitations;
