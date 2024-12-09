// src/components/NavBar.tsx
import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">YourLibrary</h1>
        <div>
          <Link to="/publisher" className="text-white mx-4 hover:underline">
            Publisher
          </Link>
          <Link to="/visitor" className="text-white mx-4 hover:underline">
            Visitor
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
