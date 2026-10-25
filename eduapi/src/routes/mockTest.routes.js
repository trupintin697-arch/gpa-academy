import { Router } from 'express';
import * as mockTestController from '../controllers/mockTest.controller.js';

const router = Router();

router.get('/', mockTestController.getMockTests);
router.post('/', mockTestController.createMockTest);
router.get('/history/:studentId', mockTestController.getStudentHistory);
router.get('/:id', mockTestController.getMockTestById);
router.post('/:id/submit', mockTestController.submitMockTest);
router.get('/:id/result', mockTestController.getMockTestResult);

export default router;
