import React from "react";

const UploadError = ({ tryAgain }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8">
      <img src="/upload-error.svg" alt="" className="w-64 mb-8" />

      <h2 className="text-4xl font-semibold mb-3">Something went wrong</h2>

      <p className="text-gray-500 text-center text-lg max-w-md">
        At this time, videos and images can't be uploaded together.
      </p>

      <button
        onClick={tryAgain}
        className="mt-8 px-8 py-3 rounded-full border-2 border-black hover:bg-gray-100 font-medium transition"
      >
        Try again
      </button>
    </div>
  );
};

export default UploadError;
