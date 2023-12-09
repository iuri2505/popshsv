import express from 'express';
import {
	findSetor,
	findAllSetor,
	createSetor,
	deleteSetor,
} from '../controllers/setor.controller.js';

const router = express.Router();

router.post('', createSetor);
router.get('/:id', findSetor);
router.get('/', findAllSetor);
router.delete('/:id', deleteSetor);

export default router;
