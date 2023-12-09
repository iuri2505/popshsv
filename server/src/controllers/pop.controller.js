import pop from '../models/pop.model.js';

export const createPop = async (req, res) => {
	console.log(req.body);
	try {
		await pop.create(req.body);
		console.log('pop criada');
		res.json({
			mensagem: 'pop criada',
		});
	} catch (error) {
		console.log(error.message);
		res.json({
			mensagem: error.message,
		});
	}
};

export const updatePop = async (req, res) => {
	try {
		await pop.update(req.body, {
			where: {
				id: req.body.id,
			},
		});
		console.log('pop atualizada');
		res.json({
			mensagem: 'pop atualizada',
		});
	} catch (error) {
		console.log(error.message);
		res.json({
			mensagem: error.message,
		});
	}
};

export const findAllPop = async (req, res) => {
	try {
		const response = await pop.findAll();
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

export const findPop = async (req, res) => {
	try {
		const response = await pop.findOne({
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

export const deletePop = async (req, res) => {
	try {
		await pop.destroy({
			where: {
				id: req.params.id,
			},
		});
		console.log('pop deletada');
		res.json({
			mensagem: 'pop deletada',
		});
	} catch (error) {
		console.log(error.message);
		res.json({
			mensagem: error.message,
		});
	}
};
