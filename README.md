# BookMyShow Backend

A backend application for a movie ticket booking platform built using Node.js and MongoDB.

## Features

- User authentication and authorization
- CRUD operations for movies, theaters, shows, and bookings
- Validation and error handling
- Logging

## Models

### User

- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, min 6 characters)
- `role` (String, required, default 'USER')

### Movie

- `title` (String, required)
- `description` (String, required)
- `language` (String, required)
- `genre` (String, required)
- `duration` (Number, required)
- `releaseDate` (Date, required)
- `poster` (String, required)

### Theater

- `name` (String, required)
- `location` (String, required)
- `address` (String, required)
- `capacity` (Number, required)

### Show

- `movie` (ObjectId, ref 'Movie', required)
- `theater` (ObjectId, ref 'Theater', required)
- `showTime` (Date, required)
- `ticketPrice` (Number, required)
- `seatsAvailable` (Number, required)

### Booking

- `user` (ObjectId, ref 'User', required)
- `show` (ObjectId, ref 'Show', required)
- `seatsBooked` (Number, required)
- `totalAmount` (Number, required)
- `bookingTime` (Date, required)
- `status` (String, required, default 'BOOKED')

## Relations

- A user can book multiple shows.
- A movie can have multiple shows in different theaters.
- A theater can have multiple shows for different movies.
- A show can have multiple bookings by different users.

## Middleware

- Authentication middleware for protecting routes that require authentication.
- Authorization middleware for protecting routes that require specific roles.
- Validation middleware for validating request bodies.

## API Documentation

The API documentation can be found at `/api-docs` after starting the server.

## License

This project is licensed under the MIT License.
