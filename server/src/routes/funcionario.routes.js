import express from 'express';
import {
	createFuncionario,
	findFuncionario,
	findTudo,
	deleteFuncionario,
	verifyLogin,
	updateFuncionario,
} from '../controllers/funcionario.controller.js';

const router = express.Router();

router.post('/', createFuncionario);
router.get('/:id', findFuncionario);
router.get('/:nome/:cpf', verifyLogin);
router.get('/', findTudo);
router.put('/', updateFuncionario);
router.delete('/:id', deleteFuncionario);

export default router;
