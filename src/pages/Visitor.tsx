// src/pages/Visitor.tsx
import React, { useEffect, useState } from "react";

const Visitor: React.FC = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5005/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Visitor - Browse Books</h2>
      <div>
        {books.length > 0 ? (
          <ul className="space-y-2">
            {books.map(
              (book: { title: string; author: string; id: number }) => (
                <li key={book.id} className="border p-4 rounded">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p>{book.author}</p>
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default Visitor;
