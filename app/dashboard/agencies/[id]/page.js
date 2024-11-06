"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

const AgencyDetailsPage = ({ params }) => {
  const { id } = params; // Get the agency ID from the URL
  const [agencyDetail, setAgencyDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    const fetchAgencyDetails = async () => {
      try {
        const response = await axiosInstance.get(`/agencies/details`, {
          params: { agency_id: id },
        });

        if (response.status === 200) {
          toast.success("Agency details fetched successfully");
          setAgencyDetail(response.data);
        } else {
          throw new Error("Failed to fetch agency details");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencyDetails();
  }, [id]);

  return (
    <div className="mt-8 p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl text-[#0077B5] font-bold mb-4 text-center">
        Agency Details
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : agencyDetail ? (
        <div className="text-black">
          <p className="mb-2">
            <strong>Agency Name:</strong> {agencyDetail.agency_name}
          </p>
          <p className="mb-2">
            <strong>Created By:</strong> {agencyDetail.created_by_user_name}{" "}
            (ID: {agencyDetail.created_by_user_id})
          </p>
          <p className="mb-2">
            <strong>Created At:</strong>{" "}
            {new Date(agencyDetail.created_at).toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>Updated At:</strong>{" "}
            {new Date(agencyDetail.updated_at).toLocaleString()}
          </p>
          <p className="mb-4">
            <strong>Total Teams:</strong> {agencyDetail.teams.length}
          </p>

          <div className="mt-4 border-t border-gray-300 pt-4">
            <h3 className="font-semibold text-lg mb-2">Admins:</h3>
            <ul className="list-disc ml-4">
              {agencyDetail.admins.map((admin) => (
                <li key={admin.user_id} className="text-sm">
                  {admin.name} - {admin.email}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 border-t border-gray-300 pt-4">
            <h3 className="font-semibold text-lg mb-2">Other Users:</h3>
            <ul className="list-disc ml-4">
              {agencyDetail.otherUsers.map((user) => (
                <li key={user.user_id} className="text-sm">
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center">No agency details available.</p>
      )}
    </div>
  );
};

export default AgencyDetailsPage;
