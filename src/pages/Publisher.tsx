import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the Book interface
interface Book {
  id: number;
  title: string;
  author: string;
  imagePath?: string; // Store the image path received from the server
  image?: File | null; // Allow image property for updates
}

// Define the state type for newBook
interface NewBook {
  title: string;
  author: string;
  image: File | null;
}

const Publisher: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showCreateBookModal, setShowCreateBookModal] = useState(false);
  const [newBook, setNewBook] = useState<NewBook>({
    title: "",
    author: "",
    image: null,
  });
  const [editBook, setEditBook] = useState<Book | null>(null);

  // Fetch books on component load
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch Books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/books`
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Handle Book Creation
  const createBook = async () => {
    if (!newBook.title || !newBook.author) {
      alert("Both title and author are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("author", newBook.author);
    if (newBook.image) {
      formData.append("image", newBook.image);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/books`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setBooks([...books, response.data]);
      setShowCreateBookModal(false);
      setNewBook({ title: "", author: "", image: null });
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  // Handle Book Update
  const updateBook = async () => {
    if (!editBook || !editBook.title || !editBook.author) {
      alert("Both title and author are required for updating.");
      return;
    }

    const formData = new FormData();
    formData.append("title", editBook.title);
    formData.append("author", editBook.author);
    if (editBook.image) {
      formData.append("image", editBook.image);
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/books/${editBook.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setBooks(
        books.map((book) => (book.id === editBook.id ? response.data : book))
      );
      setEditBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Handle Book Deletion
  const deleteBook = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Publisher Dashboard</h1>

      {/* Button to open create book modal */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        onClick={() => setShowCreateBookModal(true)}
      >
        Create Book
      </button>

      {/* Modal for creating a book */}
      {showCreateBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Book</h2>
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewBook({ ...newBook, image: e.target.files?.[0] || null })
              }
              className="w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setShowCreateBookModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={createBook}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="p-4 border rounded shadow">
            {book.imagePath && (
              <img
                src={book.imagePath}
                alt={book.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-lg font-bold">{book.title}</h3>
            <p className="text-gray-700">Author: {book.author}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-yellow-400 text-white px-4 py-2 rounded"
                onClick={() => setEditBook(book)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Book Modal */}
      {editBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Book</h2>
            <input
              type="text"
              placeholder="Title"
              value={editBook.title}
              onChange={(e) =>
                setEditBook({ ...editBook, title: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              placeholder="Author"
              value={editBook.author}
              onChange={(e) =>
                setEditBook({ ...editBook, author: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="file"
              onChange={(e) =>
                setEditBook({
                  ...editBook,
                  image: e.target.files?.[0] || null,
                })
              }
              className="w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setEditBook(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={updateBook}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Publisher;
