import { Router } from 'express';
import * as settingsController from '../controllers/settings.controller.js';

const router = Router();

router.get('/marquee', settingsController.getMarquee);
router.post('/marquee', settingsController.setMarquee);
router.get('/categories', settingsController.getCategories);
router.post('/categories', settingsController.setCategories);

export default router;
