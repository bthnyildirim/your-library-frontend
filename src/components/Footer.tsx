// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} YourLibrary. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Designed by{" "}
          <a
            href="https://github.com/bthnyildirim"
            className="text-indigo-400 hover:underline"
          >
            bthnyildirim
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
