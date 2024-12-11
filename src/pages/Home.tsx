// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  price: string;
  rating: number;
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">Build Your Library</h1>
          <p className="text-xl text-gray-300">
            A modern digital space for all your books
          </p>
        </div>
      </header>

      {/* Book Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  coverImage="https://via.placeholder.com/150"
                  price={book.price}
                  rating={book.rating}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No books available
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
