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
	cpf: yup.string().required('CPF necessário.'),
});

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (funcionarioLogado) {
			navigate('/');
		}
	});

	const [showDialog, setShowDialog] = useState(false);

	const handleCloseDialog = () => {
		setShowDialog(false);
	};

	const formik = useFormik({
		initialValues: {
			nome: '',
			cpf: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				console.log(values);
				const response = await axios.get(
					`http://localhost:3001/funcionarios/${formik.values.nome}/${formik.values.cpf}/`
				);
				const autenticado = response.data;
				if (autenticado > 0) {
					localStorage.setItem('funcionario', formik.values.nome);
					console.log(formik.values.nome);
					navigate('/');
				} else {
					setShowDialog(true);
					console.log('LOGIN INVALIDO');
				}
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<Container
			component='main'
			maxWidth='xs'
			sx={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}
		>
			<Typography
				variant='h4'
				style={{ marginTop: '20px' }}
			>
				Login
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
					error={formik.touched.nome && Boolean(formik.errors.nome)}
					helperText={formik.touched.nome && formik.errors.nome}
				/>
				<TextField
					margin='normal'
					fullWidth
					autoComplete='off'
					id='cpf'
					name='cpf'
					label='	CPF:'
					value={formik.values.cpf}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.cpf && Boolean(formik.errors.cpf)}
					helperText={formik.touched.cpf && formik.errors.cpf}
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
			<Dialog
				open={showDialog}
				onClose={handleCloseDialog}
			>
				<DialogTitle>{'Login inválido.'}</DialogTitle>
				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleCloseDialog}
					>
						Fechar
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default Login;
