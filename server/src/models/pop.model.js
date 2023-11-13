import { Sequelize } from 'sequelize';
import db from '../config/database.config.js';

const { DataTypes } = Sequelize;

const pop = db.define('pops', {
	id: {
		primaryKey: true,
		type: DataTypes.NUMBER,
		field: 'idPop',
	},
	titulo: {
		type: DataTypes.STRING,
		field: 'titulo_pop',
	},
	objetivo: {
		type: DataTypes.STRING,
		field: 'objetivo_pop',
	},
	procedimentos: {
		type: DataTypes.STRING,
		field: 'procedimentos_pop',
	},
	idFuncionarioFK: {
		type: DataTypes.NUMBER,
		field: 'idFuncionario_FK',
		references: {
			model: 'funcionarios',
			key: 'idFuncionario',
		},
	},
	idSetorFK: {
		type: DataTypes.NUMBER,
		field: 'idSetor_FK',
		references: {
			model: 'setores',
			key: 'idSetor',
		},
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

export default pop;
