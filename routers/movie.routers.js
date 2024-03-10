import express from 'express';
const router = express.Router();
import * as movieController from '../controller/movies.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import checkRoles from '../middleware/authorization.middleware.js';

router.post('/movies', authenticate, checkRoles(['admin']), movieController.createMovie);
router.get('/movies', movieController.getMovies);
router.get('/movies/:id', movieController.getMovieById);
router.put('/movies/:id', authenticate, checkRoles(['admin']), movieController.updateMovie);
router.delete('/movies/:id', authenticate, checkRoles(['admin']), movieController.deleteMovie);

export default router;
