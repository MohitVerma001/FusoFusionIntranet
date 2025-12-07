import express from 'express';
import { spaceController } from '../controllers/spaceController.js';

const router = express.Router();

router.get('/', spaceController.getAllSpaces);

router.get('/:id', spaceController.getSpaceById);

export default router;
