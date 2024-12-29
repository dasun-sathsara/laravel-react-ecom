# React + Laravel API

This project is an e-commerce platform with a React frontend and a Laravel API backend.

## Key Features

-   User authentication (login, registration, logout)
-   Product browsing and filtering by category
-   Shopping cart functionality
-   Order management
-   Admin dashboard for product management
-   Featured products carousel
-   Responsive design

## Docker Setup

The application is dockerized using `docker-compose`.

### Running the application

1.  Ensure you have Docker and Docker Compose installed.
2.  Navigate to the project root directory.
3.  Run `docker-compose up --build` to build and start the containers.
4.  The frontend will be available at `http://localhost` and the backend API at `http://localhost:8000/api`.

### Environment Variables

-   Backend environment variables are configured in `.env.backend` and `.env.mysql`.
-   Frontend environment variables are configured in `.env` (if needed).

### Services

-   `app`: Laravel API service.
-   `mysql`: MySQL database service.
-   `frontend`: React frontend service.
-   `backend-nginx`: Nginx reverse proxy for the backend API.

### Notes

-   The backend API is accessible through the `backend-nginx` service.
-   The frontend is served directly by the `frontend` service.
-   Database migrations are run automatically when the containers are built.
