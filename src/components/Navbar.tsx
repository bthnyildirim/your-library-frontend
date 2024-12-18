import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">BookStore</h1>
        <div className="space-x-6">
          <Link to="/" className="text-white text-lg hover:underline">
            Home
          </Link>
          <Link to="/publisher" className="text-white text-lg hover:underline">
            Publisher
          </Link>
          <Link to="/contact" className="text-white text-lg hover:underline">
            Contact
          </Link>
          <Link to="/cart" className="text-white text-lg hover:underline">
            View Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
