import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import BookCard from "./BookCard";

function App() {
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const getBooks = async (bookName) => {
    if (bookName === "") {
      alert("Please type something!");
      return;
    }
    setIsLoading(true);
    setErrMsg("");
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?title=${bookName}`
      );
      const docs = res.data.docs;
      if (docs.length === 0) {
        setErrMsg("No books found");
        setBookData([]);
      } else {
        setBookData(docs.slice(0, 20));
      }
    } catch (e) {
      console.log(e);
      setErrMsg("Error while fetching books");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Book Finder App</h1>

      <SearchBar onSearch={getBooks} />

      {isLoading ? <p className="text-center mt-4">Loading...</p> : null}
      {errMsg ? (
        <p className="text-center text-red-400 mt-4">{errMsg}</p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
        {bookData.map((b, i) => {
          return <BookCard key={i} book={b} />;
        })}
      </div>
    </div>
  );
}

export default App;
