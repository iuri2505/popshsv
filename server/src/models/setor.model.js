import { Sequelize } from 'sequelize';
import db from '../config/database.config.js';

const { DataTypes } = Sequelize;

const setor = db.define('setores', {
	id: {
		primaryKey: true,
		type: DataTypes.NUMBER,
		field: 'idSetor',
	},
	nome: {
		type: DataTypes.STRING,
		field: 'nome_setor',
	},
	createdAt: {
		type: DataTypes.DATE,
		field: 'data_criacao',
	},
	updatedAt: {
		type: DataTypes.DATE,
		field: 'data_revisao',
	},
});

export default setor;
