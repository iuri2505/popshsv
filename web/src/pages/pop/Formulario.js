import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import {
	Container,
	Typography,
	TextField,
	Dialog,
	Button,
	DialogActions,
	DialogTitle,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@mui/material';
import LogoutButton from '../../components/LogoutButton';
import SubmitButton from '../../components/SubmitButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
	titulo: yup.string().required('Titulo necessário.'),
	objetivo: yup.string().required('Objetivo necessário.'),
	procedimentos: yup.string().required('Procedimentos necessários.'),
	setor: yup.number().required('Setor necessário'),
});

const Formulario = () => {
	const navigate = useNavigate();
	const [setores, setSetores] = useState();

	const getSetor = async () => {
		const response = await axios.get('http://localhost:3001/setor');
		setSetores(response.data);
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}

		getSetor();
	}, [navigate]);

	const [showDialog, setShowDialog] = useState(false);

	const handleCloseDialog = () => {
		setShowDialog(false);
	};

	const formik = useFormik({
		initialValues: {
			titulo: '',
			objetivo: '',
			procedimentos: '',
			setor: '',
		},

		validationSchema: validationSchema,

		onSubmit: (values) => {
			console.log(values);

			axios.post('http://localhost:3001/pop/', {
				titulo: formik.values.titulo,
				objetivo: formik.values.objetivo,
				procedimentos: formik.values.procedimentos,
				idFuncionarioFK: localStorage.getItem('funcionario'),
				idSetorFK: formik.values.setor,
			});

			setShowDialog(true);
		},
	});

	return (
		<>
			<LogoutButton />
			<Container
				component='main'
				maxWidth='xs'
				sx={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}
			>
				<Typography
					variant='h4'
					style={{ marginTop: '20px' }}
				>
					Cadastro de POPs
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='titulo'
						name='titulo'
						label='Titulo:'
						value={formik.values.titulo}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.titulo &&
							Boolean(formik.errors.titulo)
						}
						helperText={
							formik.touched.titulo && formik.errors.titulo
						}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='objetivo'
						name='objetivo'
						label='Objetivo:'
						value={formik.values.objetivo}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.objetivo &&
							Boolean(formik.errors.objetivo)
						}
						helperText={
							formik.touched.objetivo && formik.errors.objetivo
						}
					/>
					<TextField
						margin='normal'
						fullWidth
						autoComplete='off'
						id='procedimentos'
						name='procedimentos'
						label='Procedimentos:'
						value={formik.values.procedimentos}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.procedimentos &&
							Boolean(formik.errors.procedimentos)
						}
						helperText={
							formik.touched.procedimentos &&
							formik.errors.procedimentos
						}
					/>
					<FormControl
						fullWidth
						margin='normal'
						error={
							formik.touched.setor && Boolean(formik.errors.setor)
						}
					>
						<InputLabel id='label-select'>Setor:</InputLabel>
						<Select
							id='setor'
							name='setor'
							label='setor'
							value={formik.values.setor}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						>
							{setores &&
								setores.map((setor) => (
									<MenuItem
										key={setor.id}
										value={setor.id}
									>
										{setor.nome}
									</MenuItem>
								))}
						</Select>
						{formik.touched.setor && formik.errors.setor ? (
							<FormHelperText>
								{formik.errors.setor}
							</FormHelperText>
						) : null}
					</FormControl>
					<SubmitButton />
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

export default Formulario;
