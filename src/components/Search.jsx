import React, { useState } from 'react';

const Search = ({ onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle input change and pass query back to parent
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onChange(query); // Pass query back to parent component
  };

  return (
    <div className="flex justify-end mb-4">
      <form className="max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-xs text-black border border-gray-300 rounded-lg bg-white focus:ring-blue-500 dark:text-black"
            placeholder="Search by Agency Name"
            value={searchQuery}
            onChange={handleInputChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
