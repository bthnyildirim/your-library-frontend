import axios from "axios";

const API_URL =
  `${process.env.REACT_APP_API_URL}/books` || "http://localhost:5005/api/books";

export const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching books", error);
    throw error;
  }
};

export const getBookById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book", error);
    throw error;
  }
};

export const createBook = async (title: string, author: string) => {
  try {
    const response = await axios.post(API_URL, { title, author });
    return response.data;
  } catch (error) {
    console.error("Error creating book", error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book", error);
    throw error;
  }
};
