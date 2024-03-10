import { Event } from '../models/event.models.js';
import { body, validationResult } from 'express-validator';

//Its working
export const createEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = new Event(req.body);

    await event.save();

    res.status(201).json({ message: 'Event created', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//Its working well
export const getEvents = async (req, res) => {
  try {
    // Find all events in the database
    const events = await Event.find({});

    // Send a response
    res.status(200).json({ message: 'Events retrieved', data: events });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//Its working
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event retrieved', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    Object.assign(event, req.body);

    await event.save();

    res.status(200).json({ message: 'Event updated', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//It is working

export const deleteEvent = async (req, res) => {
  try {
    console.log(req.params);

    const event = await Event.findById(req.params.id);
    console.log(event); 

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const deletedEvent = await event.deleteOne(); 
    console.log("Deleted event:", deletedEvent); 

    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error' });
  }
};
