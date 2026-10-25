import { Router } from 'express';
import * as notesController from '../controllers/notes.controller.js';

const router = Router();

router.get('/', notesController.getNotes);
router.post('/', notesController.createNote);

export default router;
