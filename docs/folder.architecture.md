# Project Architecture

The Book Management API follows a **modular layered architecture** pattern to separate concerns, ensure maintainability, and promote code reusability. This architecture provides clear boundaries between different parts of the application, making it easier to test, extend, and modify.

## Architecture Overview

The application is structured in distinct layers, each with specific responsibilities:

```
┌─────────────────────────────────────┐
│         HTTP Request (Client)        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Router Layer                 │
│  (Route definitions & routing)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Middleware Layer               │
│  (Validation, Upload, Auth, etc.)    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Controller Layer               │
│  (Request/Response handling)         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Service Layer                 │
│  (Business Logic)                    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Data Layer                   │
│  (Models & Data Storage)             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         HTTP Response                │
└──────────────────────────────────────┘
```

## Directory Structure

```
book-management-api/
├── src/
│   ├── app.ts                    # Express app setup
│   ├── server.ts                 # Server entry point
│   ├── config/
│   │   └── config.ts             # Environment & configuration
│   ├── models/
│   │   └── book.model.ts         # Data models & interfaces
│   ├── routers/
│   │   └── book.router.ts        # Route definitions
│   ├── middlewares/
│   │   ├── validate.middleware.ts # Request validation
│   │   └── upload.middleware.ts   # File upload handling
│   ├── validators/
│   │   └── book.schema.ts        # Zod validation schemas
│   ├── controller/
│   │   └── book.controller.ts    # Request handlers
│   ├── services/
│   │   └── book.service.ts       # Business logic
│   ├── utils/
│   │   ├── csv.utils.ts          # CSV parsing utilities
│   │   └── csv.utils.spec.ts     # Utility tests
│   └── tests/
│       └── book.test.ts          # Integration tests
├── docs/                         # Documentation
├── dist/                         # Compiled JavaScript (generated)
├── node_modules/                 # Dependencies (generated)
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── jest.config.js                # Jest test configuration
├── nodemon.json                  # Nodemon configuration
└── README.md                     # Project overview
```

## Layer Responsibilities

### 1. Entry Point Layer

#### `server.ts`
- **Purpose**: Application entry point
- **Responsibilities**:
  - Start the HTTP server
  - Listen on the configured port
  - Handle server startup and shutdown
  - Log server status
- **Dependencies**: `app.ts`, `config`

#### `app.ts`
- **Purpose**: Express application configuration
- **Responsibilities**:
  - Initialize Express app
  - Configure middleware (morgan, express.json, etc.)
  - Mount routers
  - Set up error handling
  - Export configured app instance
- **Dependencies**: Routers, global middlewares

### 2. Configuration Layer

#### `config/`
- **Purpose**: Centralized configuration management
- **Responsibilities**:
  - Load environment variables
  - Provide configuration values to the app
  - Set defaults for missing config
  - Validate configuration on startup
- **Files**:
  - `config.ts` - Environment and app configuration

### 3. Router Layer

#### `routers/`
- **Purpose**: Define API routes and map them to controllers
- **Responsibilities**:
  - Define route paths (e.g., `/api/books`)
  - Map HTTP methods to controller functions
  - Apply route-specific middleware
  - Group related routes together
- **Pattern**: One router per resource
- **Files**:
  - `book.router.ts` - Book resource routes

**Example**:
```typescript
router.get('/', getAllBooks);           // GET /api/books
router.get('/:id', getBookById);        // GET /api/books/:id
router.post('/', validate(createBookSchema), createBook);
```

### 4. Middleware Layer

#### `middlewares/`
- **Purpose**: Process requests before they reach controllers
- **Responsibilities**:
  - Validate request data
  - Handle file uploads
  - Authenticate users (if implemented)
  - Parse request bodies
  - Handle errors
  - Log requests
- **Files**:
  - `validate.middleware.ts` - Zod schema validation
  - `upload.middleware.ts` - Multer file upload configuration

**Middleware Flow**:
```
Request → upload.middleware → validate.middleware → Controller
```

### 5. Validator Layer

#### `validators/`
- **Purpose**: Define validation schemas using Zod
- **Responsibilities**:
  - Define data structure requirements
  - Specify validation rules
  - Type safety for request bodies
  - Reusable validation schemas
- **Files**:
  - `book.schema.ts` - Book validation schemas

**Example Schemas**:
- `createBookSchema` - Validates POST /api/books
- `updateBookSchema` - Validates PUT /api/books/:id

### 6. Controller Layer

#### `controller/`
- **Purpose**: Handle HTTP requests and responses
- **Responsibilities**:
  - Extract data from requests (params, query, body)
  - Call appropriate service methods
  - Format responses
  - Handle errors and status codes
  - Return JSON responses
- **Pattern**: One controller per resource
- **Files**:
  - `book.controller.ts` - Book request handlers

**Controller Functions**:
- `getAllBooks` - Handle GET /api/books
- `getBookById` - Handle GET /api/books/:id
- `createBook` - Handle POST /api/books
- `updateBook` - Handle PUT /api/books/:id
- `deleteBook` - Handle DELETE /api/books/:id
- `importBooks` - Handle POST /api/books/imports

### 7. Service Layer

#### `services/`
- **Purpose**: Core business logic and data manipulation
- **Responsibilities**:
  - Implement business rules
  - Perform CRUD operations
  - Interact with data storage
  - Handle data transformations
  - Contain no HTTP-specific code
- **Pattern**: One service per resource
- **Files**:
  - `book.service.ts` - Book business logic

**Service Functions**:
- `findAll()` - Get all books
- `findById(id)` - Get book by ID
- `create(bookData)` - Create new book
- `update(id, bookData)` - Update existing book
- `remove(id)` - Delete book
- `importFromCSV(csvData)` - Bulk import logic

### 8. Model Layer

#### `models/`
- **Purpose**: Define data structures and types
- **Responsibilities**:
  - Define TypeScript interfaces
  - Define data shapes
  - Type safety across the application
  - Document data structure
- **Files**:
  - `book.model.ts` - Book interface definition

**Example**:
```typescript
export interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}
```

### 9. Utility Layer

#### `utils/`
- **Purpose**: Reusable helper functions
- **Responsibilities**:
  - Provide common functionality
  - Parse and format data
  - No business logic
  - Pure functions when possible
- **Files**:
  - `csv.utils.ts` - CSV parsing utilities
  - `csv.utils.spec.ts` - Unit tests for utilities

### 10. Test Layer

#### `tests/`
- **Purpose**: Integration and unit tests
- **Responsibilities**:
  - Test API endpoints
  - Validate business logic
  - Ensure code quality
  - Prevent regressions
- **Testing Tools**:
  - Jest - Test runner
  - Supertest - HTTP assertions
  - ts-jest - TypeScript support
- **Files**:
  - `book.test.ts` - Book API integration tests

## Data Flow

### Complete Request Flow

```
1. HTTP Request arrives
   ↓
2. Express receives request
   ↓
3. Router matches the route path and method
   ↓
4. Middleware chain executes
   - Parse JSON body
   - File upload (if applicable)
   - Validate request data against schema
   ↓
5. Controller function executes
   - Extract request parameters
   - Call service method
   ↓
6. Service layer executes
   - Implement business logic
   - Interact with data layer
   - Perform validation/transformation
   ↓
7. Data layer accessed
   - Retrieve/modify data (currently in-memory)
   ↓
8. Response flows back up
   - Service returns result
   - Controller formats response
   - Sends JSON response with status code
   ↓
9. HTTP Response sent to client
```

### Example: Creating a Book

```typescript
// 1. Client Request
POST /api/books
Body: { "title": "1984", "author": "George Orwell", "publishedYear": 1949 }

// 2. Router (book.router.ts)
router.post('/', validate(createBookSchema), createBook);

// 3. Middleware (validate.middleware.ts)
// Validates against createBookSchema

// 4. Controller (book.controller.ts)
const bookData = req.body;
const newBook = bookService.create(bookData);
res.status(201).json({ message: "Book created", book: newBook });

// 5. Service (book.service.ts)
const newBook = { id: uuid(), ...bookData };
books.push(newBook);
return newBook;

// 6. Response to Client
201 Created
{ "message": "Book created successfully", "book": { ... } }
```

## Design Principles

### 1. Separation of Concerns
Each layer has a single, well-defined responsibility. Controllers handle HTTP, services handle logic, models define data.

### 2. Dependency Direction
Dependencies flow downward: Controllers depend on Services, Services depend on Models. No upward dependencies.

### 3. Single Responsibility
Each file/module has one primary purpose, making the code easier to understand and modify.

### 4. DRY (Don't Repeat Yourself)
Common functionality is extracted into utilities, middleware, and shared validators.

### 5. Type Safety
TypeScript interfaces and Zod schemas ensure type safety throughout the application.

### 6. Testability
Layers are loosely coupled, making it easy to test each layer independently.

## Current Data Storage

**In-Memory Array**: Currently, the application uses an in-memory array to store books. This means:
- Data is lost when the server restarts
- No persistence between sessions
- Suitable for development and testing
- Easy to replace with a database later

**Future Enhancement**: Can be replaced with:
- Database (PostgreSQL, MongoDB, MySQL)
- ORM (Prisma, TypeORM, Sequelize)
- Repository pattern for data access abstraction

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: Zod
- **File Upload**: Multer
- **Logging**: Morgan
- **Testing**: Jest + Supertest
- **Dev Tools**: tsx, nodemon

## Extension Points

The architecture makes it easy to add:

1. **Authentication/Authorization**: Add auth middleware
2. **Database**: Replace in-memory storage in service layer
3. **Error Handling**: Add error handling middleware
4. **Logging**: Extend logging utilities
5. **Caching**: Add caching layer between service and data
6. **Rate Limiting**: Add rate limiting middleware
7. **API Versioning**: Create versioned routers
8. **WebSockets**: Add WebSocket handlers alongside REST routes

## Best Practices

1. **Keep controllers thin**: Business logic belongs in services
2. **Use dependency injection**: Pass dependencies rather than importing
3. **Validate early**: Use middleware for validation
4. **Handle errors consistently**: Use error handling middleware
5. **Write tests**: Test each layer independently
6. **Document APIs**: Keep API documentation up to date
7. **Use TypeScript strictly**: Enable strict mode in tsconfig.json
