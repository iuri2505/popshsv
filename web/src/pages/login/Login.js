import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import {
	Container,
	Typography,
	TextField,
	Paper,
	Grid,
	Snackbar,
	Alert,
} from '@mui/material';
import SubmitButton from '../../components/SubmitButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
	nome: yup.string().required('Nome necessário.'),
	cpf: yup
		.string()
		.required('CPF necessário.')
		.max(11, 'O CPF possui 11 dígitos')
		.min(11, 'O CPF possui 11 dígitos'),
});

const Login = () => {
	const navigate = useNavigate();
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (funcionarioLogado) {
			navigate('/');
		}
	});

	const formik = useFormik({
		initialValues: {
			nome: '',
			cpf: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const response = await axios.get(
					`http://localhost:3001/funcionario/${formik.values.nome}/${formik.values.cpf}`
				);
				const autenticado = response.data;
				if (autenticado) {
					console.log(response.data.id);
					localStorage.setItem('funcionario', response.data.id);
					navigate('/');
				} else {
					setSnackbarOpen(true);
					console.log('LOGIN INVALIDO');
				}
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<>
			<Container
				component={Paper}
				maxWidth='sm'
			>
				<Typography
					variant='h4'
					marginBottom='1rem'
				>
					Login
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<Grid
						container
						spacing={2}
					>
						<Grid
							item
							xs={12}
						>
							<TextField
								fullWidth
								autoComplete='off'
								id='nome'
								name='nome'
								label='Nome:'
								value={formik.values.nome}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.nome &&
									Boolean(formik.errors.nome)
								}
								helperText={
									formik.touched.nome && formik.errors.nome
								}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<TextField
								fullWidth
								autoComplete='off'
								id='cpf'
								name='cpf'
								label='	CPF:'
								value={formik.values.cpf}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.cpf &&
									Boolean(formik.errors.cpf)
								}
								helperText={
									formik.touched.cpf && formik.errors.cpf
								}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							marginBottom='1rem'
						>
							<SubmitButton />
						</Grid>
					</Grid>
				</form>
			</Container>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity='error'
				>
					Login invalido!
				</Alert>
			</Snackbar>
		</>
	);
};

export default Login;
