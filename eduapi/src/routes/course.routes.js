import { Router } from 'express';
import * as courseController from '../controllers/course.controller.js';

const router = Router();

router.get('/', courseController.getCourses);
router.get('/:idOrSlug', courseController.getCourseByIdOrSlug);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

export default router;
