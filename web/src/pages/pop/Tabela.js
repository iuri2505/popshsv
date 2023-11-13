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

	const getPop = async () => {
		const response = await axios.get('http://localhost:3001/pop');
		setPops(response.data);
	};

	const handleInfo = (id) => {
		navigate(`/pop/informacoes/${id}`);
	};

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:3001/pop/${id}`);
		getPop();
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
						xs={6}
					>
						<Typography variant='h4'>POPS:</Typography>
					</Grid>
					<Grid item>
						<Link href='/setor'>
							<IconButton>
								<SetorIcon />
								Setores
							</IconButton>
						</Link>
					</Grid>
					<Grid item>
						<Link href='/funcionario'>
							<IconButton>
								<FuncionarioIcon />
								Funcionários
							</IconButton>
						</Link>
					</Grid>
					<Grid item>
						<Link href='/pop/formulario'>
							<IconButton>
								<MaisIcon />
								Adicionar POP
							</IconButton>
						</Link>
					</Grid>
				</Grid>
				<TableContainer component={Paper}>
					<Table aria-label='pops'>
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
											<IconButton>
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
		</>
	);
};

export default Tabela;
