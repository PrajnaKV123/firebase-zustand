"use client";

import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import Link from "next/link";

export default function TodoManager() {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodoStore();

  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    addTodo(input);
    setInput("");
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    updateTodo(editingId, editText);
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6 flex flex-col items-center">

      {/* Back to Dashboard */}
      <Link
        href="/dashboard"
        className="mb-6 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">Todo Manager</h1>

      {/* Add Todo Section */}
      <div className="flex w-full max-w-lg mb-6">
        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-pink-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="w-full max-w-lg space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white shadow p-4 rounded-md flex justify-between items-center"
          >
            {editingId === todo.id ? (
              // Edit Mode
              <div className="flex w-full gap-3">
                <input
                  className="flex-1 px-3 py-1 border border-gray-300 rounded-md"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            ) : (
              // View Mode
              <>
                <span>{todo.text}</span>

                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(todo)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
