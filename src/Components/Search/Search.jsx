import React from "react";

function Search({ onSearch }) {
  function handleSearch(event) {
    onSearch(event.target.value);
  }

  return (
    <div className="search">
      <input className="searchBar"
        type="text"
        placeholder="Search notes..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;