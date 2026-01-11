import type { Book } from '../models/book.model.js';
import { v4 as uuid } from "uuid";

const books: Book[] = [];

export const getAllBooks = () => books;

export const getBookById = (id: string) =>
  books.find(book => book.id === id);

export const createBook = (data: Omit<Book, "id">) => {
  const book: Book = { id: uuid(), ...data };
  books.push(book);
  return book;
};

export const updateBook = (id: string, data: Omit<Book, "id">) => {
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return null;
  books[index] = { id, ...data };
  return books[index];
};

export const deleteBook = (id: string) => {
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
};

export const bulkInsert = (newBooks: Book[]) => {
  books.push(...newBooks);
};
