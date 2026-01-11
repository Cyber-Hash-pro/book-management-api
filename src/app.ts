import express from "express";
import morgan from "morgan"
import bookRouter from "./routers/book.router.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book Management API is running");
});

app.use('/api/books',bookRouter);

export default app;
