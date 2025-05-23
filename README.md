# School Management API

A Node.js RESTful API for managing schools, allowing you to add schools and list them sorted by proximity to a given location.

## Features
- Add a new school with name, address, latitude, and longitude
- List all schools sorted by distance from a given latitude/longitude
- MySQL database integration

## Tech Stack
- Node.js
- Express
- MySQL
- dotenv
- body-parser
- nodemon (dev)

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MySQL database

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd school-management-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   PORT=3000
   ```
4. Set up the database. Example schema:
   ```sql
   CREATE TABLE schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     address VARCHAR(255) NOT NULL,
     lattitude FLOAT NOT NULL,
     longitude FLOAT NOT NULL
   );
   ```

### Running the Server
- Start the server:
  ```bash
  npm start
  ```
- For development with auto-reload:
  ```bash
  npm run dev
  ```

## API Endpoints

### Test Database Connection
- **GET /**
  - Returns a welcome message.
- **GET /test-db**
  - Tests the database connection.
  - **Response:** `{ success: true, result: 2 }` on success.

### Add a School
- **POST /addSchool**
  - **Body:**
    ```json
    {
      "name": "School Name",
      "address": "123 Main St",
      "latitude": 12.34,
      "longitude": 56.78
    }
    ```
  - **Response:**
    ```json
    { "message": "School added successfully", "schoolId": 1 }
    ```

### List Schools by Proximity
- **GET /listSchools?latitude=12.34&longitude=56.78**
  - **Query Params:**
    - `latitude` (required)
    - `longitude` (required)
  - **Response:**
    ```json
    {
      "schools": [
        {
          "id": 1,
          "name": "School Name",
          "address": "123 Main St",
          "lattitude": 12.34,
          "longitude": 56.78,
          "distance": 0
        },
        // ...
      ]
    }
    ```

## Project Structure
```
school-management-api/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   └── schoolController.js
├── routes/
│   └── schoolRoutes.js
├── package.json
└── README.md
```

