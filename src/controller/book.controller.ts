import type { Request, Response } from "express";
import * as bookService from "../services/book.service.js";

const createBook = (req: Request, res: Response) => {
  const { title, author, publishedDate } = req.body;
try {
  const book = bookService.createBook({
    title,
    author,
    publishedDate: publishedDate
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
}


const controller = {
  createBook,
  getBooks,
  getBookById
};
export default controller;
