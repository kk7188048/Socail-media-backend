import { Show } from "../models/show.models.js";
import { Theater } from "../models/theater.models.js";
// It is working  well
export const createTheater = async (req, res) => {
  try {
    const theater = new Theater(req.body);
    await theater.save();
    console.log("Reached here")
    res.status(201).json(theater);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find({});
    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTheaterById = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
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
    const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    const theater = await Theater.findByIdAndDelete(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    const df = await Show.deleteMany({ theater: theater._id });
    console.log(df)
    res.status(200).json({ message: 'Theater deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
