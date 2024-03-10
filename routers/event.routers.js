import express from 'express';
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent } from '../controller/event.controller.js';
import { validateEvent } from '../middleware/validation.middleware.js';

const router = express.Router();

router.post('/events', validateEvent, createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEvent);
router.put('/events/:id', validateEvent, updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;
