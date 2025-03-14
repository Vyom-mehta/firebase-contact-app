import React, { useState } from "react";
import AddContactForm from "./AddContactForm";

const SearchBar = ({ onAdd, onSearch }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mt-6 flex items-center gap-2">
      <div className="relative flex-1">
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-white"></i>
        <input
          type="text"
          placeholder="Search Contact"
          className="ml-0.5 w-full rounded-lg border border-gray-400 bg-transparent px-10 py-2 text-white outline-none"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <button
        onClick={() => setShowForm(true)}
        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 text-black shadow-md"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      {showForm && (
        <AddContactForm onClose={() => setShowForm(false)} onAdd={onAdd} />
      )}
    </div>
  );
};

export default SearchBar;
