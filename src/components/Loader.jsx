import React from "react";

const Loader = ({ isLoading }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isLoading ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    </div>
  );
};

export default Loader;
