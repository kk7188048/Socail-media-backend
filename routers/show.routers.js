import express from 'express';
import * as showController from '../controller/show.controller.js';

const router = express.Router();

router.post('/show', showController.createShow);
router.get('/show', showController.getShows);
router.get('/shoow/:id', showController.getShowById);
router.put('/show/:id', showController.updateShow);
router.delete('/show/:id', showController.deleteShow);

export default router;
