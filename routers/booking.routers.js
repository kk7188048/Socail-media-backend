import express from 'express';
import * as bookingController from '../controller/booking.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new booking
router.post('/book', authenticate, bookingController.createBooking);

// Get all bookings for a user
router.get('/book', authenticate, bookingController.getUserBookings);

// Cancel a booking
router.delete('/:bookingId', authenticate, bookingController.cancelBooking);

export default router;
