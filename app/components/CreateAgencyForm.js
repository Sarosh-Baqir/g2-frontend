"use client";

import { useState } from "react";

const CreateAgencyForm = () => {
  const [agencyName, setAgencyName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/agencies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ agency_name: agencyName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create agency");
      }

      setAgencyName("");
      alert("Agency created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-green-500">Create Agency</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
          placeholder="Agency Name"
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Create Agency
        </button>
      </form>
    </div>
  );
};

export default CreateAgencyForm;
