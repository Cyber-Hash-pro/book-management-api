# Running the Application

This document provides instructions on how to run, test, and build the Book Management API.

## Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Comes with Node.js

## Installation

First, install all project dependencies:

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory (if needed) with any required environment variables:

```env
PORT=3000
NODE_ENV=development
```

## Available Scripts

### Development Mode

Run the application in development mode with hot-reloading:

```bash
npm run dev
```

This starts the server using `tsx` with watch mode. Any changes to the source files will automatically restart the server.

- **Default URL**: `http://localhost:3000`
- **Base API Path**: `/api/books`

### Production Build

Build the TypeScript code into JavaScript:

```bash
npm run build
```

This compiles all TypeScript files from `src/` into the `dist/` directory according to the `tsconfig.json` configuration.

### Production Mode

After building, start the application in production mode:

```bash
npm start
```

This runs the compiled JavaScript code from the `dist/` directory.

### Running Tests

Execute the test suite using Jest:

```bash
npm test
```

This runs all test files (`*.test.ts` or `*.spec.ts`) using Jest with experimental VM modules support.

## Development Workflow

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Make Changes**: Edit files in the `src/` directory

3. **Test Your Changes**: The server automatically restarts

4. **Run Tests** (optional):
   ```bash
   npm test
   ```

5. **Before Deployment**:
   ```bash
   npm run build
   npm start
   ```

## Testing the API

You can test the API endpoints using:

- **cURL**
- **Postman**
- **Thunder Client** (VS Code Extension)
- **HTTPie**

Example using cURL:

```bash
# Get all books
curl http://localhost:3000/api/books

# Create a new book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Sample Book","author":"John Doe","publishedYear":2024}'

# Upload CSV file
curl -X POST http://localhost:3000/api/books/import \
  -F "file=@books.csv"
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, either:
1. Stop the process using that port
2. Change the port in your `.env` file or config

### Module Not Found Errors

Run:
```bash
npm install
```

### TypeScript Compilation Errors

Check your `tsconfig.json` settings and ensure all files have correct imports.

### Test Failures

Make sure the application is not running when executing tests, as tests may use the same port.

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run test suite |

## Additional Tools

- **nodemon**: Configured for automatic server restarts (see `nodemon.json`)
- **tsx**: TypeScript execution with hot-reload
- **Jest**: Testing framework with TypeScript support

For more information, see:
- [API Documentation](api.docs.md)
- [Project Architecture](folder.architecture.md)
- [Naming Conventions](naming.docs.md)
