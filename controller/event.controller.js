// Import required modules
import eventSchema from '../models/event.models.js';
import { body, validationResult } from 'express-validator';

// Create a new event
export const createEvent = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new event object
    const event = new eventSchema(req.body);

    // Save the event to the database
    await event.save();

    // Send a response
    res.status(201).json({ message: 'Event created', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    // Find all events in the database
    const events = await eventSchema.find({});

    // Send a response
    res.status(200).json({ message: 'Events retrieved', data: events });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single event
export const getEvent = async (req, res) => {
  try {
    // Find the event by ID
    const event = await eventSchema.findById(req.params.id);

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Send a response
    res.status(200).json({ message: 'Event retrieved', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the event by ID
    const event = await eventSchema.findById(req.params.id);

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update the event with new data
    Object.assign(event, req.body);

    // Save the updated event to the database
    await event.save();

    // Send a response
    res.status(200).json({ message: 'Event updated', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    // Find the event by ID
    const event = await eventSchema.findById(req.params.id);

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete the event from the database
    await event.remove();

    // Send a response
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
