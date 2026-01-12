# Book Management API Documentation

Base URL: `/api/books`

## Endpoints

### 1. Get All Books
- **URL**: `/`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: `{ "message": "Books retrieved successfully", "books": [...] }`

### 2. Get Book by ID
- **URL**: `/:id`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: `{ "message": "Book retrieved successfully", "book": { ... } }`
- **Error Response**:
  - **Code**: 404 Not Found
  - **Content**: `{ "message": "Book not found" }`

### 3. Create Book
- **URL**: `/`
- **Method**: `POST`
- **Data Params**: 
  ```json
  {
    "title": "String",
    "author": "String",
    "publishedYear": Number
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**: `{ "message": "Book created successfully", "book": { ... } }`
- **Error Response**:
  - **Code**: 400 Bad Request (Validation Error)

### 4. Update Book
- **URL**: `/:id`
- **Method**: `PUT`
- **Data Params**: 
  ```json
  {
    "title": "String",
    "author": "String",
    "publishedYear": Number
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: `{ "message": "Book updated successfully", "book": { ... } }`

### 5. Delete Book
- **URL**: `/:id`
- **Method**: `DELETE`
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: `{ "message": "Book deleted successfully" }`

### 6. Import Books (CSV)
- **URL**: `/import`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **File Key**: `file` (Must be a `.csv` file)
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: 
    ```json
    {
      "added": 2,
      "errors": []
    }
    ```
