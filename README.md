# Task Manager API

The **Task Manager API** is a backend service built using **Node.js** and **Express.js**, designed to efficiently manage tasks through a **RESTful API**. It integrates **MongoDB Atlas** for persistent data storage and leverages **JWT (JSON Web Tokens)** for authentication. This API provides full task management features, from creating tasks to updating and deleting them, while ensuring data validation and security. All endpoints are well-documented with **Swagger** for easy integration and understanding.

## 🚀 Key Features

### Model (Task)
- **Unique ID**: Automatically generated and autoincremented.
- **Title**: A required field of type string, with unique property.
- **Description**: An optional field of type string.
- **Status**: A boolean field (`completed or pending`), defaults to `false`.
- **Creation Date**: Automatically generated upon task creation.

### CRUD Operations:
- **Create**: Ensures the title field is provided before saving a task.
- **Read**:
  - Fetch all tasks.
  - Filter tasks by status (completed or pending).
  - Retrieve a specific task by its `taskId`.
- **Update**: Modify any field of an existing task.
- **Delete**: Remove a specific task by its `taskId`.

### Authentication:
- Utilizes **JWT (JSON Web Tokens)** to secure all task-related endpoints.
- Only authenticated users can access protected routes.

### Documentation:
- **Swagger** API documentation is available at `/api-docs`.

### Validation:
- Input validation is performed using **express-validator**.
- Structured error handling with clear response codes (`400`, `404`, `500`).
- The title is unique to avoid duplicates tasks.
- Validations on Login and Register endpoints.

---

## ⚙️ Technologies Used

- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB.
- **JWT (JSON Web Tokens)**: For authentication and authorization.
- **bcryptjs**: Library for hashing and comparing passwords.
- **dotenv**: For managing environment variables securely.
- **body-parser**: Middleware to parse incoming request bodies.
- **CORS**: Enables Cross-Origin Resource Sharing for API access.
- **Swagger**: API documentation tool using swagger-jsdoc and swagger-ui-express.
- **express-validator**: Middleware for validating input data.
- **mongoose-sequence**: Adds auto-incrementing sequence fields to Mongoose models.
 **Development Dependencies**
- **Jest**: Testing framework for unit and integration tests.
- **Supertest**: Library for testing HTTP endpoints.

---

## 🛠️ Installation

### Prerequisites:
- **Node.js v14** or later.
- **MongoDB** (local or cloud-based, e.g., MongoDB Atlas).

### Installation Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager-api.git
   cd task-manager-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file in the project's root directory:
   ```plaintext
   PORT=3001
   MONGO_URI=your_mongo_db_uri
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```bash
   node server.js
   ```

   The server will be available at [http://localhost:3001](http://localhost:3001).

---

## 📝 API Endpoints

### Authentication

| Method | Endpoint            | Description                        |
|--------|---------------------|------------------------------------|
| POST   | /api/auth/register   | Register a new user.              |
| POST   | /api/auth/login      | Log in and obtain a JWT token.    |

### Tasks

| Method | Endpoint                  | Description                                      |
|--------|---------------------------|--------------------------------------------------|
| POST   | /api/tasks                | Create a new task.                              |
| GET    | /api/tasks                | Retrieve all tasks (with optional filters).     |
| GET    | /api/tasks/:id            | Retrieve a specific task by `taskId`.           |
| PUT    | /api/tasks/:id            | Update a specific task by `taskId`.             |
| DELETE | /api/tasks/:id            | Delete a specific task by `taskId`.             |

### Swagger UI
Access the full API documentation via Swagger at [http://localhost:3001/api-docs](http://localhost:3001/api-docs). It provides interactive examples for each endpoint documented.

---

## 🔐 Authentication

### Register
Create a user with a unique username and a secure password.
- **Endpoint**: `POST /api/auth/register`

### Log In
Submit credentials (username and password) to receive a JWT token.
- **Endpoint**: `POST /api/auth/login`

Example response:
```json
{
  "token": "<jwt_token>"
}
```

### Using the Token
Include the token in the `Authorization` header for all protected endpoints:
```plaintext
Authorization: Bearer <jwt_token>
```

---

## 🗂️ Project Structure

```plaintext
ramon-api-taskmanager/
├── src/
│   ├── config/
│   │   └── db.js            # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication controllers
│   │   └── taskController.js  # Task controllers
│   ├── helper/
│   │   └── authHandler.js    # Middleware for JWT authentication
│   │   └── errorHandler.js   # Middleware for JWT authentication
│   ├── models/
│   │   ├── Task.js           # Task data model
│   │   └── User.js           # User data model
│   ├── routes/
│   │   ├── authRoutes.js     # Authentication routes
│   │   └── taskRoutes.js     # Task-related routes
│   ├── swagger/
│   │   └── swaggerConfig.js  # Swagger configuration
│   ├── testing/              
│   │   └── tasks.test.js     # Endpoints test details
│   └── app.js                # Main Express configuration
├── .env                      # Environment variables configuration
├── server.js                 # Main server entry point
└── README.md                 # Project documentation
```

---

## ⚠️ Error Handling

The API uses structured error handling. Common HTTP status codes include:

- **400 Bad Request**: When the data sent does not meet validation requirements.
- **404 Not Found**: When the requested resource does not exist.
- **500 Internal Server Error**: When a server error occurs.

---

## 🧪 Testing

Unit tests for the backend are implemented using **Jest** and **Supertest**. These tests cover:

- **Authentication**:
  - User registration.
  - User login.
- **Tasks**:
  - Full CRUD operations for tasks.
  - Validation for required fields.

To run the tests:
```bash
npm test
```
