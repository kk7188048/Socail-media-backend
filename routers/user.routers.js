import express from 'express';
const router = express.Router();
import * as userController from '../controller/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.use(authenticate);

router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.delete('/profile', userController.deleteUserProfile);

export default router;
