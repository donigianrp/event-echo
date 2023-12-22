"use client";
import Link from "next/link";
import React, { useState } from "react";

const EventSeries = () => {
  return (
    <div className="m-8 flex justify-center items-center ">
      <h1>Event Series</h1>
      {/* <input
        type="text"
        name="seriesName"
        id="seriesName"
        value={seriesName}
        onChange={(e) => {
          setSeriesName(e.target.value);
        }}
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Series Name"
      /> */}

      <Link href="/event_series/add_event">
        <button
          type="button"
          className="ml-8 h-9 px-3 py-2 text-xs font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </Link>
    </div>
  );
};

export default EventSeries;
