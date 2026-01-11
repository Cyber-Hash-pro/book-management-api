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

}


const controller = {
  createBook,
  getBooks
};
export default controller;
