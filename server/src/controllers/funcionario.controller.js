import funcionario from '../models/funcionario.model.js';

export const createFuncionario = async (req, res) => {
	console.log(req.body);
	try {
		await funcionario.create(req.body);
		console.log('funcionario criado');
		res.json({
			mensagem: 'funcionario criado',
		});
	} catch (error) {
		console.log(error.message);
		res.json({
			messagem: error.message,
		});
	}
};

export const updateFuncionario = async (req, res) => {
	try {
		await funcionario.update(req.body, {
			where: {
				id: req.body.id,
			},
		});
		console.log('funcionario atualizado');
		res.json({
			mensagem: 'funcionario atualizado',
		});
	} catch (error) {
		console.log(error.message);
		res.json({
			messagem: error.message,
		});
	}
};

export const verifyLogin = async (req, res) => {
	try {
		const response = await funcionario.findOne({
			where: {
				nome: req.params.nome,
				cpf: req.params.cpf,
			},
		});
		console.log(response);
		res.json(response);
		return response;
	} catch (error) {
		console.log(error.message);
		res.json({ mensagem: error.message });
	}
};

export const findFuncionario = async (req, res) => {
	try {
		const response = await funcionario.findOne({
			where: {
				id: req.params.id,
			},
		});
		console.log(response);
		res.json(response);
		return response;
	} catch (error) {
		console.log(error.message);
		res.json({
			mensagem: error.message,
		});
	}
};

export const findTudo = async (req, res) => {
	try {
		const response = await funcionario.findAll();
		res.json(response);
		return response;
	} catch (error) {
		console.log(error.message);
	}
};

export const deleteFuncionario = async (req, res) => {
	try {
		await funcionario.destroy({
			where: {
				id: req.params.id,
			},
		});
		console.log('funcionario deletado');
		res.json({
			mensagem: 'funcionario deletado',
		});
	} catch (error) {
		console.log(error);
		res.json({
			mensagem: error.message,
		});
	}
};
