import express from 'express';
import {
	createPop,
	findAllPop,
	findPop,
	deletePop,
} from '../controllers/pop.controller.js';

const router = express.Router();

router.post('/', createPop);
router.get('/', findAllPop);
router.get('/:id', findPop);
router.delete('/:id', deletePop);

export default router;
