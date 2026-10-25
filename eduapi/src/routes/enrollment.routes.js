import { Router } from 'express';
import * as enrollmentController from '../controllers/enrollment.controller.js';

const router = Router();

router.get('/', enrollmentController.getEnrollments);
router.post('/', enrollmentController.createEnrollment);

export default router;
