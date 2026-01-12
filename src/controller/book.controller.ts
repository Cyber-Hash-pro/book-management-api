import type { Request, Response } from "express";
import * as bookService from "../services/book.service.js";
import { parseCSV } from "../utils/csv.untils.js";

const createBook = (req: Request, res: Response) => {
  try {
    const { title, author, publishedYear } = req.body;
    const book = bookService.createBook({ title, author, publishedYear });
    if (!book) {
      return res.status(500).json({ message: "Failed to create book" });
    }
    return res.status(201).json({
      message: "Book created successfully",
      book
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getBooks = (req: Request, res: Response) => {
  try {
    const books = bookService.getAllBooks();
    return res.status(200).json({
      message: "Books retrieved successfully",
      books
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getBookById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    const book = bookService.getBookById(String(id));
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({
      message: "Book retrieved successfully",
      book
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateBook = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    const { title, author, publishedYear } = req.body;
    const updatedBook = bookService.updateBook(String(id), {
      title,
      author,
      publishedYear
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBook = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    const deleted = bookService.deleteBook(String(id));
    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({
      message: "Book deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const importBooks = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }
    const csvText = req.file.buffer.toString("utf-8");
    const { validBooks, errors } = parseCSV(csvText);
    bookService.bulkInsert(validBooks);
    return res.status(200).json({
      added: validBooks.length,
      books: validBooks,
      errors
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const controller = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  importBooks
};
export default controller;
