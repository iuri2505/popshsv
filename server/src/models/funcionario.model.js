import { Sequelize } from 'sequelize';
import db from '../config/database.config.js';

const { DataTypes } = Sequelize;

const funcionario = db.define('funcionarios', {
	id: {
		primaryKey: true,
		type: DataTypes.NUMBER,
		field: 'idFuncionario',
	},
	nome: {
		type: DataTypes.STRING,
		field: 'nome_funcionario',
	},
	cpf: {
		type: DataTypes.STRING,
		field: 'cpf_funcionario',
	},
	cnpj: {
		type: DataTypes.STRING,
		field: 'cnpj_funcionario',
	},
	conselho: {
		type: DataTypes.STRING,
		field: 'conselho_funcionario',
	},
	numeroConselho: {
		type: DataTypes.NUMBER,
		field: 'numero_conselho',
	},
	especialidade: {
		type: DataTypes.STRING,
		field: 'especialidade_funcionario',
	},
	classificacao: {
		type: DataTypes.STRING,
		field: 'classificacao_funcionario',
	},
	cns: {
		type: DataTypes.STRING,
		field: 'numero_cns',
	},
	convenio: {
		type: DataTypes.STRING,
		field: 'convenio_funcionario',
	},
	faturamento: {
		type: DataTypes.STRING,
		field: 'faturamento_funcionario',
	},
	atuacao: {
		type: DataTypes.STRING,
		field: 'atuacao_funcionario',
	},
	observacao: {
		type: DataTypes.STRING,
		field: 'observacao_funcionario',
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

export default funcionario;
