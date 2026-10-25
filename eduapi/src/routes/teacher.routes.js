import { Router } from 'express';
import * as teacherController from '../controllers/teacher.controller.js';

const router = Router();

router.get('/videos', teacherController.getVideos);
router.post('/videos', teacherController.createVideo);
router.get('/submissions', teacherController.getSubmissions);

export default router;
