"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectModal from "./ProjectModal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data.uniqueProjects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-black font-bold mb-4">Projects</h1>

      {projects && projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.project_id} className="border text-black p-4 mb-2">
              <h2 className="font-semibold text-xl text-[#0077B5]">
                {project.project_name}
              </h2>
              <h6 className="font-semibold">Assigned To:</h6>
              <div className="text-black shadow">
                <p>Team ID: {project.assigned_team_id}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black">No projects available</p>
      )}

      <button
        onClick={openModal}
        className="px-4 py-2 m-2 bg-[#0077B5] text-white rounded"
      >
        Create Project
      </button>

      <ProjectModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        fetchProjects={fetchProjects}
      />
    </div>
  );
};

export default Projects;
