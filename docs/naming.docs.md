# Naming Conventions

Consistency in naming helps in quickly navigating and understanding the codebase.

## Files and Folders
- **Folders**: Use lowercase and dot notation if needed (e.g., `middlewares`).
- **Files**: Use `camelCase` followed by a descriptive suffix:
  - Controllers: `*.controller.ts`
  - Routers: `*.router.ts`
  - Services: `*.service.ts`
  - Models: `*.model.ts`
  - Validators: `*.schema.ts`
  - Tests: `*.test.ts` or `*.spec.ts`

## Code Symbols
- **Variables & Functions**: `camelCase` (e.g., `getBookById`, `createdBookId`).
- **Classes & Interfaces**: `PascalCase` (e.g., `Book`).
- **Constants**: `UPPER_SNAKE_CASE` or `camelCase` depending on scope.

## Routes
- Use plural nouns for resource paths: `/api/books`.
- Use standard HTTP methods: `GET`, `POST`, `PUT`, `DELETE`.
- Use specific sub-paths for special actions: `/api/books/imports`.
