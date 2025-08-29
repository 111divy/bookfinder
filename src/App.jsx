import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import BookCard from "./BookCard";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async (query) => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      if (res.data.docs.length === 0) {
        setError("No results found.");
        setBooks([]);
      } else {
        setBooks(res.data.docs.slice(0, 20));
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fHww')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
          📚 Book Finder
        </h1>
        <SearchBar onSearch={fetchBooks} />

        {loading && <p className="text-gray-200 mt-4">Loading...</p>}
        {error && <p className="text-red-400 mt-4">{error}</p>}

        <div className="grid gap-6 mt-8 w-full max-w-5xl sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
