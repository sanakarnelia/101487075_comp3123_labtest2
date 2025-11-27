
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
    setValue("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city (e.g., Toronto)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
