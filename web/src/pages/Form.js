import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import {
	Container,
	Typography,
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
	nome: yup.string().required('Nome necessário.'),
	cpf: yup.string().required('CPF necessário.').max(11, 'Limite de digitos.'),
	cnpj: yup
		.string()
		.required('CNPJ necessário')
		.max(14, 'limite de digitos.'),
	setor: yup.string().required('Setor necessário.'),
});

const Form = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}
	});

	const [showDialog, setShowDialog] = useState(false);

	const handleCloseDialog = () => {
		setShowDialog(false);
	};

	const handleLogout = () => {
		localStorage.clear();
		navigate('/login');
	};

	const formik = useFormik({
		initialValues: {
			nome: '',
			cpf: '',
			cnpj: '',
			conselho: '',
			numeroConselho: '',
			especialidade: '',
			classificacao: '',
			cns: '',
			convenio: '',
			faturamento: '',
			atuacao: '',
			observacao: '',
			setor: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
			axios.post('http://localhost:3001/funcionarios', {
				nome_funcionario: formik.values.nome,
				cpf_funcionario: formik.values.cpf,
				cnpj_funcionario: formik.values.cnpj,
				conselho_funcionaro: formik.values.conselho,
				numero_conselho: formik.values.numeroConselho,
				especialidade_funcionario: formik.values.especialidade,
				classificacao_funcionario: formik.values.classificacao,
				numero_cns: formik.values.cns,
				convenio_funcionario: formik.values.convenio,
				faturamento_funcionario: formik.values.faturamento,
				atuacao_funcionario: formik.values.atuacao,
				observacao_funcionario: formik.values.observacao,
				idSetor_FK: formik.values.setor,
			});
			setShowDialog(true);
		},
	});

	return (
		<>
			<Button
				variant='outlined'
				color='error'
				onClick={handleLogout}
			>
				Logout
			</Button>
			<Container
				component='main'
				maxWidth='xs'
				sx={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}
			>
				<Typography
					variant='h4'
					style={{ marginTop: '20px' }}
				>
					Cadastro
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='nome'
						name='nome'
						label='Nome:'
						value={formik.values.nome}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.nome && Boolean(formik.errors.nome)
						}
						helperText={formik.touched.nome && formik.errors.nome}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='cpf'
						name='cpf'
						label='CPF:'
						value={formik.values.cpf}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.cpf && Boolean(formik.errors.cpf)}
						helperText={formik.touched.cpf && formik.errors.cpf}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='cnpj'
						name='cnpj'
						label='CNPJ:'
						value={formik.values.cnpj}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.cnpj && Boolean(formik.errors.cnpj)
						}
						helperText={formik.touched.cnpj && formik.errors.cnpj}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='conselho'
						name='conselho'
						label='Conselho:'
						value={formik.values.conselho}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='numeroConselho'
						name='numeroConselho'
						label='Número Conselho:'
						value={formik.values.numeroConselho}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='especialidade'
						name='especialidade'
						label='Especialidade:'
						value={formik.values.especialidade}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='classificacao'
						name='classificacao'
						label='Classificação:'
						value={formik.values.classificacao}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='cns'
						name='cns'
						label='CNS:'
						value={formik.values.cns}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='convenio'
						name='convenio'
						label='Convênio:'
						value={formik.values.convenio}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='faturamento'
						name='faturamento'
						label='Faturamento:'
						value={formik.values.faturamento}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='atuacao'
						name='atuacao'
						label='Atuação:'
						value={formik.values.atuacao}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='observacao'
						name='observacao'
						label='Observação:'
						value={formik.values.observacao}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='setor'
						name='setor'
						label='Setor:'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.setor && Boolean(formik.errors.setor)
						}
						helperText={formik.touched.setor && formik.errors.setor}
					/>
					<Button
						type='submit'
						variant='outlined'
						fullWidth
						style={{ marginBottom: '20px' }}
					>
						Enviar
					</Button>
				</form>
			</Container>
			<Dialog
				open={showDialog}
				onClose={handleCloseDialog}
			>
				<DialogTitle>{'Cadastrado com sucesso!'}</DialogTitle>
				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleCloseDialog}
					>
						Fechar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Form;
