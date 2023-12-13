import Link from "next/link";
import React from "react";

const EventSeries = () => {
  return (
    <div className="m-8 flex justify-center items-center ">
      <h1>Event Series</h1>
      <Link href="/event_series/add_event">
        <button
          type="button"
          className="ml-8 h-9 px-3 py-2 text-xs font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Series
        </button>
      </Link>
    </div>
  );
};

export default EventSeries;
