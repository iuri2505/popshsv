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
	Link,
	Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import MaisIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import TopBar from '../../components/TopBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tabela = () => {
	const navigate = useNavigate();
	const [funcionarios, setFuncionarios] = useState([]);

	const getFuncionario = async () => {
		const response = await axios.get('http://localhost:3001/funcionario');
		setFuncionarios(response.data);
	};

	const handleInfo = (id) => {
		navigate(`/funcionario/informacoes/${id}`);
	};

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:3001/funcionario/${id}`);
		getFuncionario();
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}
		getFuncionario();
	}, [navigate]);

	return (
		<>
			<TopBar />
			<Container sx={{ marginTop: '1rem' }}>
				<Grid
					container
					spacing={2}
				>
					<Grid item>
						<Typography variant='h4'>Funcionários:</Typography>
					</Grid>
					<Grid
						item
						xs={9}
					>
						<Grid
							container
							justifyContent='flex-end'
						>
							<Grid item>
								<Link href='/funcionario/formulario'>
									<IconButton>
										<MaisIcon />
										Adicionar funcionário
									</IconButton>
								</Link>
							</Grid>
							<Grid
								item
								textAlign='right'
							>
								<Link href='/'>
									<IconButton>
										<HomeIcon />
										Voltar
									</IconButton>
								</Link>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<TableContainer component={Paper}>
					<Table aria-label='funcionarios'>
						<TableBody>
							{funcionarios.map((funcionario) => (
								<TableRow key={funcionario.id}>
									<TableCell>{funcionario.id}</TableCell>
									<TableCell>{funcionario.nome}</TableCell>
									<TableCell align='right'>
										<Tooltip title='Informações'>
											<IconButton
												onClick={() => {
													handleInfo(funcionario.id);
												}}
											>
												<SearchIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
									<TableCell align='right'>
										<Tooltip title='Editar'>
											<IconButton>
												<EditIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
									<TableCell align='right'>
										<Tooltip title='Excluir'>
											<IconButton
												onClick={() =>
													handleDelete(funcionario.id)
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
		</>
	);
};

export default Tabela;
