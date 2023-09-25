import Funcionario from '../models/models.js';

export const createFuncionario = async (req, res) => {
	console.log(req.body);
	try {
		await Funcionario.create(req.body);
		console.log('funcionario criado');
		res.json({
			mensagem: 'funcionario criado',
		});
	} catch (error) {
		console.log(error.message);
		res.json({
			message: error.message,
		});
	}
};

export const findFuncionario = async (req, res) => {
	try {
		const funcionario = await Funcionario.count({
			where: {
				nome_funcionario: req.params.nome,
				cpf_funcionario: req.params.cpf,
			},
		});
		console.log(funcionario);
		res.json(funcionario);
		return funcionario;
	} catch (error) {
		console.log(error.message);
	}
};

export const findTudo = async (req, res) => {
	try {
		const funcionarios = await Funcionario.findAll();
		res.json(funcionarios);
	} catch (error) {
		console.log(error.message);
	}
};
