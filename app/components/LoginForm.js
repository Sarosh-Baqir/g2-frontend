// components/LoginForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../actions/loginAction";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await loginUser(email, password);
      if (userData) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-[#0077B5] mb-4">
          Sign in to G2
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Connect and collaborate on projects
        </p>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-[#0077B5] text-white py-2 rounded-md hover:bg-[#005B7F] transition duration-150"
          >
            Sign In
          </button>
        </form>
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <a href="/signup" className="hover:underline text-[#0077B5]">
            Join now
          </a>
          <a href="/forgot-password" className="hover:underline text-[#0077B5]">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
