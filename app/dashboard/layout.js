"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ProtectedRoute from "../components/protectedRoute";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to agencies if on the dashboard root
    if (pathname === "/dashboard") {
      router.replace("/dashboard/agencies");
    }
  }, [pathname, router]);

  const navigateToView = (view) => {
    router.push(`/dashboard/${view}`);
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
                  pathname === `/dashboard/${view}`
                    ? "bg-blue-100 font-bold shadow"
                    : ""
                }`}
                onClick={() => navigateToView(view)}
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
          <div className="max-w-6xl w-full p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-3xl text-[#0077B5] font-bold text-center flex-grow">
              DASHBOARD
            </h3>
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
