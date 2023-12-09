import {
	Table,
	TableBody,
	TableContainer,
	TableRow,
	TableCell,
	Paper,
	IconButton,
	Container,
	Grid,
	Typography,
	Tooltip,
	Link,
	TextField,
	Snackbar,
	Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import MaisIcon from '@mui/icons-material/Add';
import TopBar from '../../components/TopBar';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
	nome: yup.string().required('Nome necessário.'),
});

const Tabela = () => {
	const navigate = useNavigate();
	const [setores, setSetores] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState();
	const [alertSeverity, setAlertSeverity] = useState();

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const getSetores = async () => {
		const response = await axios.get('http://localhost:3001/setor');
		setSetores(response.data);
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:3001/setor/${id}`);
			getSetores();
			setSnackbarMessage('Setor deletado!');
			setAlertSeverity('success');
			setSnackbarOpen(true);
		} catch (error) {
			getSetores();
			setSnackbarMessage('Impossivel deletar!');
			setAlertSeverity('error');
			setSnackbarOpen(true);
		}
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}
		getSetores();
	}, [navigate]);

	const formik = useFormik({
		initialValues: {
			nome: '',
		},

		validationSchema: validationSchema,

		onSubmit: async (values) => {
			await axios.post('http://localhost:3001/setor/', {
				nome: formik.values.nome,
			});
			formik.resetForm();
			getSetores();
			setSnackbarMessage('Setor cadastrado!');
			setAlertSeverity('success');
			setSnackbarOpen(true);
		},
	});

	return (
		<>
			<TopBar />
			<Container sx={{ marginTop: '1rem' }}>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						xs={4}
					>
						<Typography variant='h4'>Setores:</Typography>
					</Grid>
					<Grid
						item
						xs={8}
					>
						<Grid
							container
							justifyContent='flex-end'
						>
							<Grid item>
								<Tooltip title='Voltar'>
									<Link href='/'>
										<IconButton>
											<HomeIcon />
										</IconButton>
									</Link>
								</Tooltip>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Container
					component={Paper}
					sx={{ marginTop: '1rem', paddingBottom: '1rem' }}
				>
					<form onSubmit={formik.handleSubmit}>
						<Grid
							container
							spacing={2}
							marginBottom='1rem'
						>
							<Grid item>
								<TextField
									autoComplete='off'
									id='nome'
									name='nome'
									label='Adicionar setor:'
									value={formik.values.nome}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.nome &&
										Boolean(formik.errors.nome)
									}
									helperText={
										formik.touched.nome &&
										formik.errors.nome
									}
								/>
							</Grid>
							<Grid item>
								<Tooltip title='Adicionar setor'>
									<IconButton type='submit'>
										<MaisIcon fontSize='large' />
									</IconButton>
								</Tooltip>
							</Grid>
						</Grid>
					</form>
					<TableContainer component={Paper}>
						<Table>
							<TableBody>
								{setores.map((setor) => (
									<TableRow>
										<TableCell>{setor.id}</TableCell>
										<TableCell>{setor.nome}</TableCell>
										<TableCell align='right'>
											<IconButton
												aria-label='excluir'
												onClick={() =>
													handleDelete(setor.id)
												}
											>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
			</Container>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={alertSeverity}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</>
	);
};

export default Tabela;
