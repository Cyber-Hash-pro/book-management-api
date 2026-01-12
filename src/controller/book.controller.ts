import type { Request, Response } from "express";
import * as bookService from "../services/book.service.js";
import { parseCSV } from "../utils/csv.untils.js";

const createBook = (req: Request, res: Response) => {
  const { title, author, publishedYear } = req.body;
try {
  const book = bookService.createBook({
    title,
    author,
    publishedYear: publishedYear
  });
  if (!book) {
    return res.status(500).json({ message: "Failed to create book" });
  }

 return res.status(201).json({
    message: "Book created successfully",
    book
  })}
  catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }


    
};
const getBooks = (req: Request, res: Response) => {
  const books = bookService.getAllBooks()
  return res.status(200).json({ 
    message: "Books retrieved successfully",
    books 
   });



}
const getBookById = (req: Request, res: Response) => {
  const { id } = req.params;
  const book = bookService.getBookById(String(id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json({ 
    message: "Book retrieved successfully",
    book 
   });
}
const updateBook = (req: Request, res: Response) => {
  const { id } = req.params;
  if(!id){
    return res.status(400).json({ message: "Book ID is required" });
  }
  const { title, author, publishedYear } = req.body;
  const updatedBook = bookService.updateBook(String(id), {
    title,
    author,
    publishedYear: publishedYear
  });
  if (!updatedBook) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json({
    message: "Book updated successfully",
    book: updatedBook
  });
}
const deleteBook= (req: Request, res: Response) => {
  const { id } = req.params;
  if(!id){
    return res.status(400).json({ message: "Book ID is required" });
  }
  const deleted = bookService.deleteBook(String(id));
  if (!deleted) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json({
    message: "Book deleted successfully"
  });

}
 const importBooks = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV file is required" });
  }

  const csvText = req.file.buffer.toString("utf-8");

  const { validBooks, errors } = parseCSV(csvText);

  bookService.bulkInsert(validBooks);

  res.json({
    added: validBooks.length,
    books : validBooks,
    errors
  });
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
