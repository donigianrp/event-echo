"use client";
import React, { useState } from "react";

interface Props {
  onSearch: (val: string) => void;
}
const SearchInput = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");
  const [warning, setWarning] = useState(false);

  const handleSearch = () => {
    // Call the parent component's onSearch function with the query
    onSearch(query);
  };

  return (
    <div className="flex items-end">
      <div className="w-80">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Video Search
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="video"
            id="video"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search for video..."
          />
        </div>
      </div>
      <button
        onClick={handleSearch}
        type="button"
        className="ml-8 h-9 px-3 py-2 text-xs font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
