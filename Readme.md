# 📚 Book Management API

A robust, production-ready RESTful API for managing a book library with full CRUD operations and CSV import functionality. Built with TypeScript, Express.js, and modern best practices.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-lightgrey.svg)](https://expressjs.com/)
[![Jest](https://img.shields.io/badge/Tested_with-Jest-red.svg)](https://jestjs.io/)

## 🌟 Key Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete books
- 📁 **CSV Bulk Import** - Upload CSV files to import multiple books at once
- 🔒 **Input Validation** - Zod schema validation for all endpoints
- 🧪 **Comprehensive Testing** - Unit and integration tests with Jest & Supertest
- 📝 **TypeScript** - Fully typed codebase for enhanced developer experience
- 🏗️ **Clean Architecture** - Separation of concerns with controllers, services, and models
- 🚀 **Production Ready** - Error handling, logging, and health checks
- 📊 **File Upload Security** - CSV file validation with size limits (50MB max)

## 🛠️ Tech Stack

### Core
- **Runtime**: Node.js (LTS)
- **Language**: TypeScript 5.9.3
- **Framework**: Express.js 5.2.1
- **Validation**: Zod 4.3.5

### Development
- **Testing**: Jest 30.2.0 + Supertest 7.2.2
- **Dev Server**: tsx 4.21.0
- **Type Safety**: Strict TypeScript configuration

### Additional Libraries
- **File Upload**: Multer 2.0.2
- **Logging**: Morgan 1.10.1
- **UUID Generation**: uuid 13.0.0
- **Environment Variables**: dotenv 17.2.3

## 📁 Project Structure

```
book-management-api/
├── src/
│   ├── app.ts                  # Express app configuration
│   ├── server.ts               # HTTP server entry point
│   ├── config/
│   │   └── config.ts           # Environment configuration
│   ├── controller/
│   │   └── book.controller.ts  # Request handlers
│   ├── middlewares/
│   │   ├── upload.middleware.ts    # File upload configuration
│   │   └── validate.middleware.ts  # Zod validation middleware
│   ├── models/
│   │   └── book.model.ts       # Book interface definition
│   ├── routers/
│   │   └── book.router.ts      # API route definitions
│   ├── services/
│   │   └── book.service.ts     # Business logic layer
│   ├── utils/
│   │   └── csv.untils.ts       # CSV parsing utilities
│   ├── validators/
│   │   └── book.schema.ts      # Zod validation schemas
│   └── tests/
│       └── book.test.ts        # Integration tests
├── docs/
│   ├── api.docs.md             # API endpoint documentation
│   ├── folder.architecture.md   # Architecture overview
│   └── naming.docs.md          # Naming conventions
├── dist/                        # Compiled JavaScript output
├── jest.config.js              # Jest configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install 
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   ```

### Running the Application

#### Development Mode (with hot-reload)

Start the development server with automatic restart on file changes:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

#### Production Mode

1. **Build the application**
   
   Compile TypeScript to JavaScript:
   ```bash
   npm run build
   ```
   
   This creates the `dist/` directory with compiled JavaScript files.

2. **Start the production server**
   ```bash
   npm start
   ```
   
   Or directly:
   ```bash
   node dist/server.js
   ```

   The API will be available at `http://localhost:3000`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production server |
| `npm test` | Run all tests with Jest |

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api/books
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all books |
| GET | `/:id` | Get a specific book by ID |
| POST | `/` | Create a new book |
| PUT | `/:id` | Update an existing book |
| DELETE | `/:id` | Delete a book |
| POST | `/imports` | Import books from CSV file |

### Detailed Documentation

#### 1. Get All Books
```http
GET /api/books
```

**Response:**
```json
{
  "message": "Books retrieved successfully",
  "books": [
    {
      "id": "uuid",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "publishedYear": 2008
    }
  ]
}
```

#### 2. Get Book by ID
```http
GET /api/books/:id
```

**Response:**
```json
{
  "message": "Book retrieved successfully",
  "book": {
    "id": "uuid",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "publishedYear": 2008
  }
}
```

#### 3. Create Book
```http
POST /api/books
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publishedYear": 2008
}
```

**Validation Rules:**
- `title`: Required, non-empty string
- `author`: Required, non-empty string
- `publishedYear`: Required, number, cannot be in the future

**Response (201 Created):**
```json
{
  "message": "Book created successfully",
  "book": {
    "id": "uuid",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "publishedYear": 2008
  }
}
```

#### 4. Update Book
```http
PUT /api/books/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Clean Code - Updated",
  "author": "Robert C. Martin",
  "publishedYear": 2008
}
```

**Response (200 OK):**
```json
{
  "message": "Book updated successfully",
  "book": {
    "id": "uuid",
    "title": "Clean Code - Updated",
    "author": "Robert C. Martin",
    "publishedYear": 2008
  }
}
```

#### 5. Delete Book
```http
DELETE /api/books/:id
```

**Response (200 OK):**
```json
{
  "message": "Book deleted successfully"
}
```

#### 6. Import Books from CSV
```http
POST /api/books/imports
Content-Type: multipart/form-data
```

**CSV Format:**
```csv
id,title,author,publishedYear
1,Atomic Habits,James Clear,2018
2,Deep Work,Cal Newport,2016
```

**Response (200 OK):**
```json
{
  "added": 2,
  "books": [...],
  "errors": []
}
```

**With Errors:**
```json
{
  "added": 1,
  "books": [...],
  "errors": [
    {
      "row": 3,
      "error": "Invalid publishedYear"
    }
  ]
}
```

**File Requirements:**
- Max size: 50MB
- Format: CSV only (`.csv` extension)
- MIME types: `text/csv` or `application/vnd.ms-excel`

## 🧪 Testing

The project includes comprehensive test coverage:

- **Unit Tests**: CSV parsing, validation logic
- **Integration Tests**: Full API endpoint testing with Supertest

**Run all tests:**
```bash
npm test
```

**Test Results:**
- 18 tests passing
- 100% endpoint coverage
- Unit + Integration tests

## 🏗️ Architecture

The project follows a **layered architecture** pattern:

```
Request → Router → Middleware → Controller → Service → Model
```

### Layer Responsibilities

1. **Router**: Route definitions and middleware attachment
2. **Middleware**: Request validation, file uploads, error handling
3. **Controller**: Request/response handling, HTTP status codes
4. **Service**: Business logic, data manipulation
5. **Model**: Data structure definitions (TypeScript interfaces)

### Key Design Patterns

- ✅ Separation of Concerns
- ✅ Dependency Injection
- ✅ Middleware Pattern
- ✅ Service Layer Pattern
- ✅ Repository Pattern (ready for database integration)

## 🔒 Error Handling

The API implements comprehensive error handling:

- **Validation Errors** (400): Invalid request body or parameters
- **Not Found Errors** (404): Resource doesn't exist
- **Server Errors** (500): Internal server errors with try-catch blocks
- **File Upload Errors** (400): Invalid file type or size exceeded

All errors return consistent JSON responses:
```json
{
  "message": "Error description",
  "errors": [...]  // Optional: validation details
}
```

## 📊 Health Check

```http
GET /health
```

**Response:**
```
OK
```

Use this endpoint for monitoring and deployment health checks.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables

Ensure the following environment variables are set:

```env
PORT=3000
NODE_ENV=production
```

### Deployment Platforms

Compatible with:
- ✅ **Render** - `npm install && npm run build` / `npm start`
- ✅ **Heroku**
- ✅ **Railway**
- ✅ **DigitalOcean App Platform**
- ✅ **AWS EC2/ECS**

## 📝 Code Quality

### TypeScript Configuration

- Strict mode enabled
- ES Modules (ESM)
- Source maps for debugging
- Declaration files generated

### Best Practices Implemented

- ✅ Async/await for asynchronous operations
- ✅ Try-catch blocks in all controllers
- ✅ Input validation with Zod
- ✅ Type safety with TypeScript
- ✅ Clean code principles
- ✅ Consistent naming conventions
- ✅ Comprehensive error handling

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow existing code style and patterns
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ using TypeScript and Express.js

## 📞 Support

For questions, issues, or suggestions, please open an issue on the repository.

---

**Note**: This is a demonstration project showcasing modern Node.js/TypeScript API development practices. The current implementation uses in-memory storage for simplicity. For production use, integrate with a persistent database.
