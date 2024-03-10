// Import required modules
import { Movie } from '../models/movie.models.js';
import { Theater } from '../models/theater.models.js';
import { Show } from '../models/show.models.js';
import { Book } from '../models/booking.models.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    // Check if the show exists
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Calculate the total price
    const movie = await Movie.findById(show.movieId);
    const theatre = await Theater.findById(show.theatreId);
    const price = movie.price + theatre.price;
    const totalPrice = price * seats;

    // Create the booking
    const booking = new Book({
      userId: req.user.id,
      showId,
      seats,
      totalPrice,
    });
    await booking.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Book.find({ userId: req.user.id });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Check if the booking exists
    const booking = await Book.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the booking belongs to the user
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Cancel the booking
    booking.isCancelled = true;
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
