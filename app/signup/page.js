"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "../core/authLogic";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // New fields
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      await createAccount(email, password, name, position, department);
      alert("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Create Employee Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Position (e.g., Developer)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Department (e.g., IT)"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="email"
          placeholder="Work Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded w-full">
          Create Account
        </button>
      </form>
    </div>
  );
}
