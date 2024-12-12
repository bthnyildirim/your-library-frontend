import React from "react";

interface BookProps {
  title: string;
  author: string;
  coverImage: string | null;
  rating?: number;
  price?: string;
  isPublisher?: boolean;
  onDelete?: () => void;
  onUpdate?: () => void;
}

const BookCard: React.FC<BookProps> = ({
  title,
  author,
  coverImage,
  rating = 0,
  price = "$0.00",
  isPublisher = false,
  onDelete,
  onUpdate,
}) => {
  // Generate image URL
  const imageUrl = coverImage
    ? coverImage.startsWith("/uploads/") || coverImage.startsWith("http")
      ? coverImage
      : `${
          process.env.REACT_APP_API_URL?.replace("/api", "") ||
          "http://localhost:5005"
        }/uploads/${coverImage}`
    : "https://via.placeholder.com/150";

  // Render star ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {Array(fullStars)
          .fill(null)
          .map((_, i) => (
            <svg
              key={`full-${i}`}
              className="w-4 h-4 text-yellow-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        {Array(emptyStars)
          .fill(null)
          .map((_, i) => (
            <svg
              key={`empty-${i}`}
              className="w-4 h-4 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
      </>
    );
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full book-card">
      <a href="#">
        {coverImage ? (
          <img
            className="p-8 rounded-t-lg"
            src={imageUrl}
            alt={`${title} cover`}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <div className="p-8 bg-gray-200 rounded-t-lg flex items-center justify-center h-48">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
          </div>
        )}
      </a>
      <div className="px-5 pb-5 flex-grow flex flex-col">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="text-gray-500 dark:text-gray-400">{author}</p>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center">{renderStars(rating)}</div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {price}
          </span>
          {isPublisher ? (
            <div className="flex space-x-2">
              <button
                onClick={onUpdate}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ) : (
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
