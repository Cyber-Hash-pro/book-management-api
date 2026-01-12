# Naming Conventions

Consistency in naming helps in quickly navigating and understanding the codebase. This document outlines the naming standards used throughout the Book Management API project.

## Files and Folders

### Folder Naming
- **Format**: Use lowercase with plural nouns
- **Examples**:
  - `controllers/` - Not `controller/`
  - `middlewares/` - Not `middleware/`
  - `models/` - Not `model/`
  - `services/` - Not `service/`
  - `validators/` - Not `validator/`
  - `tests/` - For test files
  - `utils/` - For utility functions
  - `config/` - For configuration files

### File Naming
- **Format**: Use `camelCase` or `kebab-case` followed by a descriptive suffix
- **Pattern**: `<resource>.<type>.ts`

| Type | Pattern | Example |
|------|---------|---------|
| Controllers | `*.controller.ts` | `book.controller.ts` |
| Routers | `*.router.ts` | `book.router.ts` |
| Services | `*.service.ts` | `book.service.ts` |
| Models | `*.model.ts` | `book.model.ts` |
| Validators | `*.schema.ts` | `book.schema.ts` |
| Middlewares | `*.middleware.ts` | `validate.middleware.ts`, `upload.middleware.ts` |
| Utils | `*.utils.ts` | `csv.utils.ts` |
| Tests | `*.test.ts` or `*.spec.ts` | `book.test.ts`, `csv.utils.spec.ts` |
| Config | `*.ts` or `config.ts` | `config.ts` |

### Main Application Files
- `app.ts` - Express application setup and middleware configuration
- `server.ts` - Entry point that starts the HTTP server

## Code Symbols

### Variables and Functions
- **Format**: `camelCase`
- **Examples**:
  - Functions: `getBookById()`, `createBook()`, `parseCSVFile()`
  - Variables: `bookId`, `createdBook`, `uploadedFile`
  - Parameters: `req`, `res`, `next`, `bookData`

### Classes and Interfaces
- **Format**: `PascalCase`
- **Examples**:
  - Interfaces: `Book`, `BookData`, `CSVRow`
  - Classes: `BookService`, `ValidationError`
  - Types: `BookResponse`, `ErrorResponse`

### Constants
- **Global/Module Constants**: `UPPER_SNAKE_CASE`
- **Local Constants**: `camelCase` or `UPPER_SNAKE_CASE`
- **Examples**:
  ```typescript
  const PORT = 3000;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const DEFAULT_PAGE_SIZE = 20;
  const allowedExtensions = ['.csv'];
  ```

### Enums
- **Format**: `PascalCase` for enum name, `UPPER_SNAKE_CASE` for values
- **Example**:
  ```typescript
  enum BookStatus {
    AVAILABLE = 'AVAILABLE',
    BORROWED = 'BORROWED',
    RESERVED = 'RESERVED'
  }
  ```

## API Routes

### Route Paths
- **Use plural nouns** for resource collections: `/api/books` (not `/api/book`)
- **Use lowercase** with hyphens for multi-word resources: `/api/book-reviews`
- **Use specific sub-paths** for special actions: `/api/books/import`
- **Use ID parameters** for specific resources: `/api/books/:id`

### HTTP Methods
Use standard REST conventions:
- `GET` - Retrieve resource(s)
- `POST` - Create new resource
- `PUT` - Update entire resource
- `PATCH` - Partial update (if needed)
- `DELETE` - Remove resource

### Route Examples
```
GET    /api/books          - Get all books
GET    /api/books/:id      - Get specific book
POST   /api/books          - Create new book
PUT    /api/books/:id      - Update book
DELETE /api/books/:id      - Delete book
POST   /api/books/import  - Import books from CSV
```

## Request/Response Objects

### Request Parameters
- **Path params**: `id`, `bookId`, `userId`
- **Query params**: `page`, `limit`, `sortBy`, `filterBy`
- **Body params**: Match model property names (camelCase)

### Response Structure
- **Success responses**: Include descriptive `message` and relevant data
  ```typescript
  {
    "message": "Book created successfully",
    "book": { ... }
  }
  ```
- **Error responses**: Include `message` and optional `errors` array
  ```typescript
  {
    "message": "Validation failed",
    "errors": [...]
  }
  ```

## Test Naming

### Test Files
- Match the file being tested: `book.service.ts` → `book.test.ts`
- For utilities: `csv.utils.ts` → `csv.utils.spec.ts`

### Test Descriptions
Use descriptive `describe` and `it` blocks:
```typescript
describe('BookService', () => {
  describe('getBookById', () => {
    it('should return book when ID exists', () => { ... });
    it('should throw error when ID does not exist', () => { ... });
  });
});
```

## Documentation Files

- **Format**: `<topic>.docs.md` or descriptive names
- **Examples**:
  - `api.docs.md` - API endpoint documentation
  - `run.docs.md` - How to run the application
  - `naming.docs.md` - This file
  - `folder.architecture.md` - Project structure

## Best Practices

1. **Be Consistent**: Follow the established patterns throughout the codebase
2. **Be Descriptive**: Names should clearly indicate purpose
3. **Avoid Abbreviations**: Use `validation` not `val`, `request` not `req` (except in common contexts)
4. **Use Meaningful Names**: `getUserById` is better than `getUser`
5. **Avoid Redundancy**: In `book.service.ts`, use `getById()` not `getBookById()`
6. **Keep It Simple**: Shorter names are better if they're still clear

## Examples from Codebase

### Good Examples
```typescript
// File: book.controller.ts
export const getAllBooks = async (req: Request, res: Response) => { ... };
export const getBookById = async (req: Request, res: Response) => { ... };

// File: book.service.ts
export const findAll = (): Book[] => { ... };
export const findById = (id: string): Book | undefined => { ... };

// File: upload.middleware.ts
export const uploadCSV = multer({ ... });

// File: book.schema.ts
export const createBookSchema = z.object({ ... });
```

### Avoid
```typescript
// ❌ Inconsistent casing
export const Get_Books = () => { ... };

// ❌ Unclear names
export const process = () => { ... };

// ❌ Wrong file suffix
// book.ts (should be book.model.ts or book.service.ts)

// ❌ Redundant naming in context
// In book.service.ts
export const bookFindAll = () => { ... }; // Just use findAll()
```
