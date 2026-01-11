# Naming Conventions Documentation

This document describes the naming conventions used in the **Book Management REST API**
project. Following consistent naming improves readability, maintainability, and
team collaboration.

---

## 1. File & Folder Naming

- **Folders** use `kebab-case`
  - Example: `book-management-api`, `middlewares`, `controllers`

- **TypeScript files** use `kebab-case`
  - Example:
    - `book.controller.ts`
    - `book.service.ts`
    - `error.middleware.ts`

---

## 2. Route Naming

- Routes follow **RESTful conventions**
- Use **plural nouns** for collections

| Method | Endpoint | Purpose |
|------|---------|--------|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get book by ID |
| POST | `/books` | Create a book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |
| POST | `/books/import` | Bulk import via CSV |

---

## 3. Controller Naming

- Controllers are named after the resource
- Functions describe the **action clearly**

Examples:
- `getBooks`
- `getBook`
- `createBook`
- `updateBook`
- `deleteBook`
- `importBooks`


---

## 4. Service Naming

- Services handle business logic
- Function names describe **what they do**

Examples:
- `getAllBooks`
- `getBookById`
- `createBook`
- `updateBook`
- `deleteBook`
- `bulkInsert`

File:

---

## 4. Service Naming

- Services handle business logic
- Function names describe **what they do**

Examples:
- `getAllBooks`
- `getBookById`
- `createBook`
- `updateBook`
- `deleteBook`
- `bulkInsert`

---
File  

## 5. Model Naming

- Models use **PascalCase**
- Interfaces represent data structure

Example:
```ts
export interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}
