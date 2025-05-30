# Vehicle Rental System

A backend for a vehicle rental system built with Node.js, Express, and MySQL. Supports user registration, login, vehicle browsing, rentals, mock payments, and feedback.

## Features
- User registration with password hashing (bcrypt)
- User login with authentication and login tracking
- Vehicle listing with filters (type, status)
- Rental booking with availability and status checks
- Mock payment processing
- Feedback submission with rating validation

## Setup
1. Install [Node.js](https://nodejs.org) and [MySQL](https://www.mysql.com).
2. Create the database by running `schema.sql` in MySQL.
3. Install dependencies: `npm install`.
4. Start the server: `node index.js`.
5. Access APIs at `http://localhost:5000`.

## API Endpoints
- `POST /api/customer-signup`: Register a user (`username`, `email`, `password`, `full_name`, `phone`)
- `POST /api/customer-login`: Authenticate a user (`email`, `password`)
- `GET /api/vehicles`: List vehicles (supports `?type` and `?status` filters)
- `POST /api/rentals`: Book a vehicle (`userId`, `vehicleId`, `rentalDate`, `startTime`, `endTime`, `totalPrice`)
- `POST /api/payments`: Process a mock payment (`rentalId`, `paymentMethod`, `amount`)
- `POST /api/feedback`: Submit feedback (`userId`, `vehicleId`, `rating`, `review`)

## Database Schema
See `schema.sql` for the MySQL schema, including tables for `users`, `vehicles`, `rental_details`, `payments`, `feedback`, and `customer_login`.

## Sample Data
Run `seed.sql` to populate the `vehicles` table with sample data.

## Future Improvements
- Add frontend (React, Angular, etc.) for a complete full-stack experience.
- Implement JWT authentication for secure API access.
- Add admin endpoints for vehicle and user management.