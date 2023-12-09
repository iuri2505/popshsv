import setor from '../models/setor.model.js';

export const createSetor = async (req, res) => {
	try {
		await setor.create(req.body);
		console.log('setor criado');
		res.json({
			mensagem: 'setor criado',
		});
	} catch (error) {
		console.log(error.message);
		res.json({
			messagem: error.message,
		});
	}
};

export const findSetor = async (req, res) => {
	try {
		const response = await setor.findOne({
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
			menssagem: error.message,
		});
	}
};

export const findAllSetor = async (req, res) => {
	try {
		const response = await setor.findAll({
			attributes: ['id', 'nome'],
		});
		res.json(response);
		return response;
	} catch (error) {
		console.log(error.message);
		res.json({
			message: error.message,
		});
	}
};

export const deleteSetor = async (req, res) => {
	try {
		await setor.destroy({
			where: {
				id: req.params.id,
			},
		});
		console.log('setor deletado');
		res.json({
			menssagem: 'setor deletado',
		});
	} catch (error) {
		console.log(error.message);
		res.status(400).json({
			mensagem: error.message,
		});
	}
};
