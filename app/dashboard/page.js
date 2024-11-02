"use client";
import { useState } from "react";
import ProtectedRoute from "../components/protectedRoute";
import AgencyList from "../components/AgencyList";
import Invitations from "../components/Invitations";
import InviteUserModal from "../components/InviteUserModal";
import Teams from "../components/Teams";
import Projects from "../components/Projects";

export default function Dashboard() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("agencies");

  const openInviteModal = () => setIsInviteModalOpen(true);
  const closeInviteModal = () => setIsInviteModalOpen(false);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-gray-100">
        {/* Top Navigation Bar */}
        <nav className="flex justify-center items-center bg-white shadow-lg py-4 mb-4 rounded-b-lg">
          <div className="flex space-x-6">
            {["agencies", "teams", "projects", "invitations"].map((view) => (
              <button
                key={view}
                className={`text-[#0077B5] hover:bg-blue-100 rounded-md px-4 py-2 transition-all duration-200 font-medium ${
                  currentView === view ? "bg-blue-100 font-bold shadow" : ""
                }`}
                onClick={() => handleViewChange(view)}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        <main
          className="flex justify-center items-start"
          style={{ minHeight: "calc(100vh - 64px)", paddingTop: "16px" }}
        >
          <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-[#0077B5] text-4xl font-bold mb-6 text-center">
              Welcome to Your Dashboard
            </h1>

            <section>
              {currentView === "agencies" && <AgencyList />}
              {currentView === "invitations" && (
                <Invitations openInviteModal={openInviteModal} />
              )}
              {currentView === "teams" && <Teams />}
              {currentView === "projects" && <Projects />}
            </section>
            {isInviteModalOpen && (
              <InviteUserModal closeModal={closeInviteModal} />
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
