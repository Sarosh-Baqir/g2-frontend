// components/Navbar.js
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const router = useRouter();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-[#0077B5] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-white text-2xl font-bold">Your Network</h1>
        </Link>
        <div className="flex items-center gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="text-white hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-white hover:underline">
                Login
              </Link>
              <Link href="/signup" className="text-white hover:underline">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
