import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.get('/me', authController.getMe);
router.get('/users', authController.getAllUsers);
router.put('/users/:id/ban', authController.banUser);
router.put('/users/:id/profile', authController.updateProfile);

export default router;
