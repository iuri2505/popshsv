import express from 'express';
import { findSetor, findAllSetor } from '../controllers/setor.controller.js';

const router = express.Router();

router.get('/:id', findSetor);
router.get('/', findAllSetor);

export default router;
