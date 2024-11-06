"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import ProjectModal from "../../components/ProjectModal";
import { toast } from "react-toastify";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null); // To handle editing
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects");
      if (response.status == 200) {
        toast.success("Projects fetched successfully");
      } else {
        toast.warning("failed", response.data.message);
      }
      setProjects(response.data.uniqueProjects || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (project = null) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setCurrentProject(null);
    setIsModalOpen(false);
  };

  const openDetailsPage = (id) => {
    router.push(`/dashboard/projects/${id}`); // Navigate to the dynamic route
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl text-[#0077B5] font-bold text-center flex-grow">
          PROJECTS LISTING
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-[#0077B5] text-white px-4 py-2 rounded font-semibold hover:bg-[#005f8a] transition duration-300"
        >
          Create
        </button>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.project_id}
              className="w-full max-w-sm h-72 mx-auto border border-gray-300 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div>
                <h2 className="font-semibold text-xl text-[#0077B5] truncate">
                  {project.project_name}
                </h2>
                <h6 className="font-semibold text-black mt-2">Created By:</h6>
                <div className="text-black">
                  <p>Name: {project.created_by_user_name}</p>
                  <p>Email: {project.created_by_user_email}</p>
                </div>
                <h6 className="font-semibold text-black mt-2">Assigned To:</h6>
                <div className="text-black">
                  <p>Team Name: {project.assigned_team_name}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => openDetailsPage(project.project_id)}
                  className="bg-green-500 text-white px-3 py-1 rounded transition duration-300 hover:bg-green-600"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-black">No projects available</p>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        fetchProjects={fetchProjects}
        currentProject={currentProject} // Pass the current project for editing
      />
    </div>
  );
};

export default Projects;
