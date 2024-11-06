"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/apiClient";
import { toast } from "react-toastify";

const ProjectDetailPage = ({ params }) => {
  const { id } = params;
  const [projectDetail, setProjectDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/projects/details", {
          params: { project_id: id },
        });

        if (response.status === 200) {
          toast.success("Project detail fetched successfully");
          setProjectDetail(response.data);
        } else {
          toast.warning(response.data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [id]);

  const deleteProject = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      const response = await axiosInstance.post("/projects/delete", {
        projectId: id,
      });

      if (response.status === 200) {
        toast.success("Project deleted successfully");
        setProjectDetail(null);

        router.push("/dashboard/projects");
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!projectDetail)
    return <p className="text-center">No project details available.</p>;

  return (
    <div className="p-6 bg-white rounded-lg text-black shadow-lg max-w-xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-[#0077B5] text-center mb-6">
        Project Details
      </h2>
      <div className="space-y-4">
        <p className="text-lg">
          <strong>Project Name:</strong> {projectDetail.project_name}
        </p>
        <p className="text-lg">
          <strong>Created By:</strong> {projectDetail.created_by_user_name} (
          {projectDetail.created_by_user_email})
        </p>
        <p className="text-lg">
          <strong>Assigned Team:</strong> {projectDetail.assigned_team_name}
        </p>
        <p className="text-lg">
          <strong>Created At:</strong>{" "}
          {new Date(projectDetail.created_at).toLocaleString()}
        </p>
        <p className="text-lg">
          <strong>Updated At:</strong>{" "}
          {new Date(projectDetail.updated_at).toLocaleString()}
        </p>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow transition duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          Edit
        </button>
        <button
          onClick={() => deleteProject(projectDetail.project_id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
