import {
	Table,
	TableBody,
	TableContainer,
	TableRow,
	TableCell,
	Paper,
	IconButton,
	Container,
	Typography,
	Grid,
	Link,
	Tooltip,
	Snackbar,
	Alert,
} from '@mui/material';
import TopBar from '../../components/TopBar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import SetorIcon from '@mui/icons-material/BusinessCenter';
import FuncionarioIcon from '@mui/icons-material/Person';
import MaisIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tabela = () => {
	const navigate = useNavigate();
	const [pops, setPops] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const getPop = async () => {
		const response = await axios.get('http://localhost:3001/pop');
		setPops(response.data);
	};

	const handleInfo = (id) => {
		navigate(`/pop/informacoes/${id}`);
	};

	const handleEdit = (id) => {
		navigate(`/pop/edicao/${id}`);
	};

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:3001/pop/${id}`);
		getPop();
		setSnackbarOpen(true);
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}
		getPop();
	}, [navigate]);

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
						<Typography variant='h4'>POPS:</Typography>
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
								<Tooltip title='Setores'>
									<Link href='/setor'>
										<IconButton>
											<SetorIcon />
										</IconButton>
									</Link>
								</Tooltip>
							</Grid>
							<Grid item>
								<Tooltip title='Funcionários'>
									<Link href='/funcionario'>
										<IconButton>
											<FuncionarioIcon />
										</IconButton>
									</Link>
								</Tooltip>
							</Grid>
							<Grid item>
								<Tooltip title='Adicionar POP'>
									<Link href='/pop/formulario'>
										<IconButton>
											<MaisIcon />
										</IconButton>
									</Link>
								</Tooltip>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							{pops.map((pop) => (
								<TableRow key={pop.id}>
									<TableCell align='left'>
										{pop.titulo}
									</TableCell>
									<TableCell align='right'>
										<Tooltip title='Informações'>
											<IconButton
												onClick={() => {
													handleInfo(pop.id);
												}}
											>
												<SearchIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
									<TableCell align='right'>
										<Tooltip title='Editar'>
											<IconButton
												onClick={() => {
													handleEdit(pop.id);
												}}
											>
												<EditIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
									<TableCell align='right'>
										<Tooltip title='Excluir'>
											<IconButton
												onClick={() =>
													handleDelete(pop.id)
												}
											>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity='success'
				>
					POP deletada!
				</Alert>
			</Snackbar>
		</>
	);
};

export default Tabela;
