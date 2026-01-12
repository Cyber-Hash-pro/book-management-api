import request from "supertest";
import app from "../app.js";

describe("Books API Integration Tests", () => {
  let createdBookId: string;

  it("should create a new book via POST /api/books", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({
        title: "Test Book",
        author: "Test Author",
        publishedYear: 2023
      });

    expect(res.status).toBe(201);
    expect(res.body.book).toHaveProperty("id");
    createdBookId = res.body.book.id;
  });

  it("should get all books via GET /api/books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.books)).toBe(true);
    expect(res.body.books.length).toBeGreaterThan(0);
  });

  it("should get a book by id via GET /api/books/:id", async () => {
    const res = await request(app).get(`/api/books/${createdBookId}`);
    expect(res.status).toBe(200);
    expect(res.body.book.id).toBe(createdBookId);
  });

  it("should return 400 for invalid book data", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({
        title: "",
        author: "Test Author",
        publishedYear: 2023
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("should import books from CSV via POST /api/books/imports", async () => {
    const csvContent = "id,title,author,publishedYear\n1,CSV Book 1,CSV Author 1,2020\n2,CSV Book 2,CSV Author 2,2021";
    
    const res = await request(app)
      .post("/api/books/imports")
      .attach("file", Buffer.from(csvContent), "books.csv");

    expect(res.status).toBe(200);
    expect(res.body.added).toBe(2);
    expect(res.body.errors).toHaveLength(0);
  });
});
