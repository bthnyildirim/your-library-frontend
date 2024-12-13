import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css"; // Import Slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import Slick theme styles
import BookCard from "../components/BookCard";
import "./Home.css";

interface Book {
  id: number;
  title: string;
  author: string;
  imagePath: string | null;
  price: string;
  rating: number;
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/books`);
        const data = await response.json();
        setBooks(data);
        console.log("Fetched Books:", data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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

      {/* Book Section with Carousel */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <Slider {...settings} className="custom-carousel">
            {books.length > 0 ? (
              books.map((book) => {
                let coverImage: string;

                console.log("Processing Book:", book);
                console.log("Original imagePath:", book.imagePath);

                if (!book.imagePath || book.imagePath === "undefined") {
                  console.warn(`No image path for book: ${book.title}`);
                  coverImage = "https://via.placeholder.com/150";
                } else {
                  if (book.imagePath.startsWith("http://localhost:5005")) {
                    coverImage = book.imagePath;
                    console.log("Using Full URL:", coverImage);
                  } else if (
                    book.imagePath.startsWith("http://") ||
                    book.imagePath.startsWith("https://")
                  ) {
                    coverImage = book.imagePath;
                    console.log("Using Direct URL:", coverImage);
                  } else if (book.imagePath.startsWith("/uploads")) {
                    coverImage = `http://localhost:5005${book.imagePath}`;
                    console.log("Using Full URL with /uploads:", coverImage);
                  } else {
                    coverImage = `http://localhost:5005/uploads/${book.imagePath}`;
                    console.log("Constructed URL:", coverImage);
                  }
                }

                return (
                  <div key={book.id} className="h-full flex items-stretch">
                    <BookCard
                      title={book.title}
                      author={book.author}
                      coverImage={coverImage}
                      price={book.price}
                      rating={book.rating}
                    />
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No books available
              </div>
            )}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Home;
