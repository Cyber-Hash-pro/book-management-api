# Project Architecture

The project follows a modular layered architecture to separate concerns and ensure maintainability.

## Directory Structure

- **`src/`**: Main source code directory.
  - **`app.ts`**: Express application configuration and middleware setup.
  - **`server.ts`**: Entry point that starts the HTTP server.
  - **`config/`**: Configuration files and environment variable management.
  - **`controller/`**: Handles incoming HTTP requests and extracts parameters to pass to services.
  - **`middlewares/`**: Custom Express middlewares (e.g., validation, file upload handling).
  - **`models/`**: Data models and TypeScript interface definitions.
  - **`routers/`**: Route definitions mapping URLs to controller functions.
  - **`services/`**: Core business logic. Interacts with the data layer (currently an in-memory array).
  - **`utils/`**: Helper functions and utility classes (e.g., CSV parsing).
  - **`validators/`**: Zod schemas for request body validation.
  - **`tests/`**: Integration tests using Supertest.

## Data Flow
`Request -> Router -> Middleware (Validation) -> Controller -> Service -> Model -> Response`
