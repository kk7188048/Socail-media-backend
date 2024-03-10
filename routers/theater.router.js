import express from 'express';
import * as theaterController from '../controller/theater.controller.js';

const router = express.Router();

router.post('/theater', theaterController.createTheater);
router.get('/theater', theaterController.getTheaters);
router.get('/theater/:id', theaterController.getTheaterById);
router.put('/theater/:id', theaterController.updateTheater);
router.delete('/theater/:id', theaterController.deleteTheater);

export default router;
