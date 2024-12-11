// src/pages/Publisher.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
}

const Publisher: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [editBook, setEditBook] = useState<Book | null>(null);

  // Fetch all books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Add a new book
  const addBook = async () => {
    if (!newBook.title || !newBook.author) {
      alert("Both title and author are required.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5005/api/books",
        newBook
      );
      setBooks([...books, response.data]);
      setNewBook({ title: "", author: "" });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Update an existing book
  const updateBook = async () => {
    if (!editBook || !editBook.title || !editBook.author) {
      alert("Both title and author are required for updating.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5005/api/books/${editBook.id}`,
        editBook
      );
      setBooks(
        books.map((book) => (book.id === editBook.id ? response.data : book))
      );
      setEditBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Delete a book
  const deleteBook = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5005/api/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Books</h1>

      {/* List of Books */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Book List</h2>
        {books.length > 0 ? (
          <ul className="space-y-2">
            {books.map((book) => (
              <li
                key={book.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-gray-700">Author: {book.author}</p>
                </div>
                <div className="space-x-4">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                    onClick={() => setEditBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books available.</p>
        )}
      </div>

      {/* Add New Book */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Book</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addBook}
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Edit Book */}
      {editBook && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Edit Book</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={editBook.title}
              onChange={(e) =>
                setEditBook({ ...editBook, title: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Author"
              value={editBook.author}
              onChange={(e) =>
                setEditBook({ ...editBook, author: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={updateBook}
            >
              Update Book
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setEditBook(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Publisher;
