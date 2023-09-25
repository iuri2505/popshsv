import express from 'express';
import {
	createFuncionario,
	findFuncionario,
	findTudo,
} from '../controllers/controllers.js';

const router = express.Router();

router.post('/', createFuncionario);
router.get('/:nome/:cpf', findFuncionario);
router.get('/', findTudo);

export default router;
