import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard"; // Assuming BookCard is in the same folder

// Define the Book interface
interface Book {
  id: number;
  title: string;
  author: string;
  imagePath?: string;
  rating?: number;
  price?: string;
  image?: File | null;
}

interface NewBook {
  title: string;
  author: string;
  image: File | null;
  rating: number;
  price: string;
}

const Publisher: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showCreateBookModal, setShowCreateBookModal] = useState(false);
  const [newBook, setNewBook] = useState<NewBook>({
    title: "",
    author: "",
    image: null,
    rating: 0, // Default rating
    price: "", // Default price
  });
  const [editBook, setEditBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

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

  const createBook = async () => {
    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.rating ||
      !newBook.price
    ) {
      alert("Title, author, rating, and price are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("author", newBook.author);
    formData.append("rating", String(newBook.rating)); // Add rating
    formData.append("price", newBook.price); // Add price
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
      setNewBook({ title: "", author: "", image: null, rating: 0, price: "" });
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const updateBook = async () => {
    if (!editBook || !editBook.title || !editBook.author) {
      alert("Both title and author are required for updating.");
      return;
    }

    const formData = new FormData();
    formData.append("title", editBook.title);
    formData.append("author", editBook.author);
    formData.append("rating", String(editBook.rating)); // Add rating
    formData.append("price", editBook.price || ""); // Add price
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

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        onClick={() => setShowCreateBookModal(true)}
      >
        Create Book
      </button>

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

            {/* Rating Input */}
            <select
              value={newBook.rating}
              onChange={(e) =>
                setNewBook({ ...newBook, rating: Number(e.target.value) })
              }
              className="w-full p-2 border rounded mb-4"
            >
              <option value={0}>Select Rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>

            {/* Price Input */}
            <input
              type="number"
              placeholder="Price"
              value={newBook.price}
              onChange={(e) =>
                setNewBook({ ...newBook, price: e.target.value })
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            coverImage={book.imagePath || null}
            rating={book.rating || 0}
            price={book.price || "$0.00"}
            isPublisher={true}
            onDelete={() => deleteBook(book.id)}
            onUpdate={() => setEditBook(book)}
          />
        ))}
      </div>
    </div>
  );
};

export default Publisher;
