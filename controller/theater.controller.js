import theaterSchema from "../models/theater.models.js";
import showSchema from "../models/show.models.js";

export const createTheater = async (req, res) => {
  try {
    const theater = new theaterSchema(req.body);
    await theater.save();
    res.status(201).json(theater);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTheaters = async (req, res) => {
  try {
    const theaters = await theaterSchema.find({});
    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTheaterById = async (req, res) => {
  try {
    const theater = await theaterSchema.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    res.status(200).json(theater);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTheater = async (req, res) => {
  try {
    const theater = await theaterSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    res.status(200).json(theater);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTheater = async (req, res) => {
  try {
    const theater = await theaterSchema.findByIdAndDelete(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    await showSchema.deleteMany({ theater: theater._id });
    res.status(200).json({ message: 'Theater deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
