"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../core/firebaseApp";
import { useTodoStore } from "../store/todoStore";   // ✔ import Zustand
import Link from "next/link";


export default function Dashboard() {
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Zustand todos
  const { todos } = useTodoStore();  // ✔ Read tasks here

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!user) return;

      const ref = doc(db, "employees", user.uid);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) setEmployee(snapshot.data());

      setLoading(false);
    };

    fetchEmployee();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading employee details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        No employee record found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-sans font-bold mb-6 mt-20">Employee Dashboard</h1>

      {/* Employee Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        <p><strong>Joined On:</strong> {employee.joinedOn}</p>
        <Link
  href="/TodoManager"
  className=" mt-10 bg-pink-500 text-white px-5 py-3 rounded-md hover:bg-green-700 transition"
>
  Go to Todo Manager
</Link>


      </div>

      
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Assigned Tasks</h2>

        {todos.length === 0 ? (
          <p className="text-gray-500">No tasks assigned yet.</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((task) => (
              <li
                key={task.id}
                className="p-3 bg-gray-100 rounded-md border border-gray-300"
              >
                {task.text}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
