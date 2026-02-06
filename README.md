# Complaint – Incident Reporting & Evidence Management Platform

Complaint Management System is a robust and secure backend system designed for an incident reporting and evidence management platform. It provides a reliable foundation for users to report incidents, manage their cases, and upload evidence files securely. The system is built with a focus on security, scalability, and maintainability, featuring JWT-based authentication, role-based access control, and a clean MVC architecture.


## Table of Contents

- [Tech Stack](#tech-stack)
- [Core Features](#core-features)
- [Security Features](#security-features)
- [API Flow](#api-flow)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Installation and Setup](#installation-and-setup)
- [Running the Server](#running-the-server)
- [Future Improvements](#future-improvements)


## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **Email Service:** Nodemailer (for OTP email verification)
- **File Handling:** Multer (for multipart/form-data)


## Core Features

- **Email Verification:** New user emails are verified via a One-Time    Password (OTP) with a defined expiry time to ensure authenticity.
- **Secure Registration & Authentication:** Multi-step registration process (OTP verification first) and secure login using JWTs stored in HTTP-only cookies.
- **Role-Based Access Control (RBAC):** Differentiated access levels for `user` and `admin` roles, protecting administrative endpoints.
- **Incident Management:** Full CRUD (Create, Read, Update, Delete) functionality for incidents (complaints).
- **Evidence Upload:** Securely upload and associate evidence files (images, videos, documents) with specific incidents.
- **Ownership-Based Access:** Users can only view and manage their own incidents and data, ensuring data privacy and integrity.
- **Secure Logout:** Server-side mechanism to clear the authentication cookie.
- **Centralized Error Handling:** A single, consistent error handling middleware for predictable error responses.
- **MVC Architecture:** A clean and scalable Model-View-Controller folder structure to separate concerns.



## Security Features

Security is a primary design consideration for the Complaint Management System.

- **JWT Authentication:** The system uses JSON Web Tokens for stateless, secure authentication. Tokens are signed with a secret key to prevent tampering.
- **HTTP-Only Cookies:** JWTs are stored in `HttpOnly` cookies, which are not accessible via client-side JavaScript. This is a critical defense against Cross-Site Scripting (XSS) attacks.
- **Password Hashing:** User passwords are never stored in plaintext. They are salted and hashed using the `bcrypt` library, a strong and widely-trusted hashing algorithm.
- **Ownership Validation:** API endpoints that handle sensitive data include middleware to verify that the authenticated user is the legitimate owner of the requested resource.
- **Role-Based Authorization:** Critical endpoints are protected by middleware that checks the user's role (`admin` or `user`), preventing unauthorized access to administrative functions.
- **OTP Email Verification:** Prevents spam or unverified accounts by requiring users to confirm their email address before they can complete registration.


## API Flow

The authentication and registration process follows a secure, multi-step flow to ensure user validity.

1.  **Send OTP:** A prospective user sends a `POST` request with their email to `/api/auth/send-otp`. The server generates an OTP, stores it with an expiry, and emails it to the user.
2.  **Verify OTP:** The user submits the received OTP via a `POST` request to `/api/auth/verify-otp`. The server validates the OTP against the stored value and its expiry.
3.  **Register:** Upon successful OTP verification, the user can complete their registration by sending a `POST` request with their details (name, password, etc.) to `/api/auth/register`.
4.  **Login:** The registered user logs in via a `POST` request to `/api/auth/login`. The server validates credentials and, if successful, returns a JWT in a secure, `HttpOnly` cookie.
5.  **Access Protected Routes:** For all subsequent requests to protected endpoints (e.g., `POST /api/complaints`), the browser automatically includes the JWT cookie. Server-side middleware validates this token to authorize the request.


## Folder Structure

The project follows a Model-View-Controller (MVC) architectural pattern to promote separation of concerns and maintainability.

```
/
├── config/         # Environment variables and database configuration
├── controllers/    # Contains the business logic for request handling
├── middlewares/    # Custom Express middlewares (e.g., auth, error handling)
├── models/         # Mongoose schemas and data models
├── routes/         # API route definitions (e.g., authRoutes.js, complaintRoutes.js)
├── services/       # External service integrations (e.g., Nodemailer)
├── utils/          # Utility functions and helper classes
└── server.js       # The main application entry point
```

## Environment Variables

To run this project, you need to create a `.env` file in the root directory and add the following environment variables.

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=1d
COOKIE_EXPIRES_IN=1

# Nodemailer Configuration (for OTP)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password
EMAIL_FROM="Complaint Management System Support <support@example.com>"
```

## Installation and Setup

Follow these steps to get the development environment running.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/complaint-management-system-backend.git
    cd complaint-management-system-backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project root and populate it according to the Environment Variables section.


## Running the Server

You can run the server in two modes:

1.  **Development Mode:**
    This command uses `nodemon` to automatically restart the server on file changes.
    ```sh
    npm run dev
    ```

2.  **Production Mode:**
    This command runs the server using `node`.
    ```sh
    npm start
    ```

The server will start on the `PORT` specified in your `.env` file.


## Future Improvements

- **API Documentation:** Integrate Swagger or OpenAPI for automated, interactive API documentation.
- **Rate Limiting:** Implement rate limiting on authentication and other key endpoints to prevent brute-force attacks.
- **Advanced Logging:** Integrate a more robust logging library like Winston for structured, level-based logging.
- **Testing:** Develop a comprehensive test suite with unit and integration tests using a framework like Jest or Mocha.
- **Containerization:** Create a `Dockerfile` and `docker-compose.yml` to containerize the application for consistent deployment and scalability.
- **Real-time Notifications:** Add WebSocket support (e.g., using Socket.IO) for real-time updates on incident status changes.