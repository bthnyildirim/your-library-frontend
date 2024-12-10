import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-3xl w-full">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Welcome to YourLibrary
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          An E-Library for Publishers and Visitors.
        </p>
      </div>
    </div>
  );
};

export default Home;
