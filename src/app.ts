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

// Error processing
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: "Internal server error" });
});

export default app;
