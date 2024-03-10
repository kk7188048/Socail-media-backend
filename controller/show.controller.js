import { Show } from '../models/show.models.js';
import { Movie } from '../models/movie.models.js';
import { Theater } from '../models/theater.models.js';
import { Book } from '../models/booking.models.js';


export const createShow = async (req, res) => {
  try {
    const { movieId, theaterId, date, time, seats, price } = req.body;
    const movie = await movieSchema.findById(movieId);
    const theater = await theaterSchema.findById(theaterId);
    const show = new showSchema({ movie, theater, date, time, seats, price });
    await show.save();
    res.status(201).json({ message: 'Show created successfully', show });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getShows = async (req, res) => {
  try {
    const shows = await showSchema.find().populate('movie').populate('theater');
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getShowById = async (req, res) => {
  try {
    const show = await showSchema.findById(req.params.id).populate('movie').populate('theater');
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    res.status(200).json(show);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateShow = async (req, res) => {
  try {
    const show = await showSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    res.status(200).json({ message: 'Show updated successfully', show });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteShow = async (req, res) => {
  try {
    const show = await showSchema.findByIdAndDelete(req.params.id);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    await bookingSchema.deleteMany({ show: show._id });
    res.status(200).json({ message: 'Show deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
