import { Router } from 'express';
import * as contactController from '../controllers/contact.controller.js';

const router = Router();

router.post('/', contactController.submitContact);
router.get('/', contactController.getContactSubmissions);

export default router;
