"use client";
import { useState, FormEvent } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // You can hook up your search logic here
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="flex items-center bg-white rounded-full shadow-xl p-2">
          <input
            type="text"
            placeholder="Search for properties..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 px-6 text-gray-700 rounded-l-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 transition-colors duration-200"
          >
            <FaSearch className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
