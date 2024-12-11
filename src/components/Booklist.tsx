// src/components/BookList.tsx
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string; // If available, or you can use a placeholder
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:5005/api/books");
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              coverImage="https://via.placeholder.com/150" // Replace with actual cover image URL if available
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;
