import { Sequelize } from 'sequelize';
import db from '../config/database.config.js';

const { DataTypes } = Sequelize;

const Funcionario = db.define('funcionarios', {
	id: {
		primaryKey: true,
		type: DataTypes.NUMBER,
		field: 'idFuncionario',
	},
	nome_funcionario: {
		type: DataTypes.STRING,
	},
	cpf_funcionario: {
		type: DataTypes.STRING,
	},
	cnpj_funcionario: {
		type: DataTypes.STRING,
	},
	conselho_funcionario: {
		type: DataTypes.STRING,
	},
	numero_conselho: {
		type: DataTypes.NUMBER,
	},
	especialidade_funcionario: {
		type: DataTypes.STRING,
	},
	classificacao_funcionario: {
		type: DataTypes.STRING,
	},
	numero_cns: {
		type: DataTypes.STRING,
	},
	convenio_funcionario: {
		type: DataTypes.STRING,
	},
	faturamento_funcionario: {
		type: DataTypes.STRING,
	},
	atuacao_funcionario: {
		type: DataTypes.STRING,
	},
	observacao_funcionario: {
		type: DataTypes.STRING,
	},
	idSetor_FK: {
		type: DataTypes.NUMBER,
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

export default Funcionario;
