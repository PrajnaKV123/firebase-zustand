"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../core/firebaseApp";

export default function Dashboard() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!user) return;

      // Fetch the employee document created during signup
      const ref = doc(db, "employees", user.uid);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        setEmployee(snapshot.data()); 
      }

      setLoading(false);
    };

    fetchEmployee();
  }, [user]);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading employee details...
      </div>
    );
  }

  // If Firestore document doesn’t exist
  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        No employee record found!
      </div>
    );
  }

  // Main Dashboard UI
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">

        <p className="text-lg">
          <span className="font-semibold">Name:</span> {employee.name}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Position:</span> {employee.position}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Department:</span> {employee.department}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Email:</span> {employee.email}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Employee ID:</span> {employee.employeeId}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Joined On:</span> {employee.joinedOn}
        </p>

      </div>
    </div>
  );
}
