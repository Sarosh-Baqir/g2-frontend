"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

const TeamDetailPage = ({ params }) => {
  const { id } = params;
  const [teamDetail, setTeamDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTeamDetails = async () => {
      try {
        const response = await axiosInstance.get("/teams/details", {
          params: { team_id: id },
        });
        toast.success("Team detail fetched successfully");
        setTeamDetail(response.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!teamDetail)
    return <p className="text-center">No team details available.</p>;

  return (
    <div className="p-6 rounded-lg text-black shadow-lg max-w-lg mx-auto">
      <h2 className="text-3xl text-[#0077B5] text-center mb-6">Team Details</h2>
      <div className="space-y-3 mb-6">
        <p className="text-lg">
          <strong className="text-xl font-semibold text-[#0077B5] mb-2">
            Team Name:
          </strong>{" "}
          {teamDetail.team_name}
        </p>
        <p className="text-lg">
          <strong className="text-xl font-semibold text-[#0077B5] mb-2">
            Agency Name:
          </strong>{" "}
          {teamDetail.agency_name}
        </p>
        <p className="text-lg">
          <strong className="text-xl font-semibold text-[#0077B5] mb-2">
            Created at:
          </strong>{" "}
          {new Date(teamDetail.created_at).toLocaleString()}
        </p>
        <p className="text-lg">
          <strong className="text-xl font-semibold text-[#0077B5] mb-2">
            Updated at:
          </strong>{" "}
          {new Date(teamDetail.updated_at).toLocaleString()}
        </p>
        <p className="text-lg">
          <strong className="text-xl font-semibold text-[#0077B5] mb-2">
            Total Members:
          </strong>{" "}
          {teamDetail.members.length}
        </p>
        <p className="text-gray-900 font-semibold">
          <strong className="text-xl font-semibold text-[#0077B5] mb-2">
            Team Lead:
          </strong>{" "}
          {teamDetail.team_lead_user_name}
        </p>
      </div>

      <div className="mb-4 border-t border-b border-gray-300 py-4">
        <h3 className="text-2xl font-semibold text-[#0077B5] mb-4">Members:</h3>
        <ul className="space-y-4">
          {teamDetail.members.map((member) => (
            <li
              key={member.user_id}
              className="p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">
                  {member.name}
                </span>
                <span className="text-gray-600 text-sm">{member.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamDetailPage;
