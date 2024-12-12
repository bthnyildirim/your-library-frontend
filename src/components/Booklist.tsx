import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string; // Image filename returned from the backend
  price: string;
  rating: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/books");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log("Fetched books in BookList:", data);

        // Verify coverImage structure for each book
        data.forEach((book: Book) => {
          console.log(`Book ID: ${book.id}, CoverImage: ${book.coverImage}`);
        });

        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => {
            // Dynamically construct the coverImage URL
            const coverImage = book.coverImage
              ? book.coverImage.startsWith("/uploads/")
                ? `${
                    process.env.REACT_APP_API_URL?.replace("/api", "") ||
                    "http://localhost:5005"
                  }${book.coverImage}` // Use full path if already starts with /uploads/
                : `${
                    process.env.REACT_APP_API_URL?.replace("/api", "") ||
                    "http://localhost:5005"
                  }/uploads/${book.coverImage}` // Append /uploads/ if needed
              : "https://via.placeholder.com/150";

            console.log("coverImage:", book.coverImage);
            console.log("Generated coverImage URL:", coverImage);

            return (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                coverImage={coverImage}
                price={book.price}
                rating={book.rating}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookList;
