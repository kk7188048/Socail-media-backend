import { Movie } from "../models/movie.models.js";
import { Show } from "../models/show.models.js";

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ movie });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create movie' });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get movies' });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get movie' });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update movie' });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    await Show.deleteMany({ movie: movie._id });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete movie' });
  }
};
