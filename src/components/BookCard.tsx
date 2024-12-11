// src/components/BookCard.tsx
import React from "react";

interface BookProps {
  title: string;
  author: string;
  coverImage: string;
}

const BookCard: React.FC<BookProps> = ({ title, author, coverImage }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-center mb-6">
        <img
          src={coverImage}
          alt="book cover"
          className="w-32 h-48 object-cover rounded-md"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500 mt-2">{author}</p>
      <div className="mt-4">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-full w-full">
          Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
export {};
