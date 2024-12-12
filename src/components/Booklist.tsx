import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // Importing Slider from react-slick
import "slick-carousel/slick/slick.css"; // Import Slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import Slick theme styles

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  price: string;
  rating: number;
}

const CustomArrow: React.FC<any> = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      background: "#000", // Black arrow color
      borderRadius: "50%",
      zIndex: 1,
    }}
    onClick={onClick}
  />
);

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
        console.log("Fetched books:", data);
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Slick carousel settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <Slider {...settings}>
          {books.map((book) => {
            const coverImage = book.coverImage
              ? book.coverImage.startsWith("/uploads/")
                ? `${
                    process.env.REACT_APP_API_URL?.replace("/api", "") ||
                    "http://localhost:5005"
                  }${book.coverImage}`
                : `${
                    process.env.REACT_APP_API_URL?.replace("/api", "") ||
                    "http://localhost:5005"
                  }/uploads/${book.coverImage}`
              : "https://via.placeholder.com/150";

            return (
              <div
                key={book.id}
                className="card flex flex-col bg-white rounded shadow-lg h-full"
              >
                <img
                  src={coverImage}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-gray-500">{book.author}</p>
                  <p className="mt-2 text-gray-700">{book.price}</p>
                  <p className="mt-2 text-yellow-500">
                    {"⭐".repeat(Math.round(book.rating))} ({book.rating})
                  </p>
                  <button className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-full">
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default BookList;
