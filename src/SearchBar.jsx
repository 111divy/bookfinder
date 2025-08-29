import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl shadow-lg">
      <input
        type="text"
        placeholder="Search for a book..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-3 rounded-l-xl border border-gray-50 text-amber-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 rounded-r-xl hover:bg-red-800 transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
