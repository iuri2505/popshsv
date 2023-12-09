import {
	Grid,
	Typography,
	Container,
	Paper,
	IconButton,
	Tooltip,
	Link,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TopBar from '../../components/TopBar';
import VoltarIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const Informacoes = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [funcionario, setFuncionario] = useState([]);
	const [setor, setSetor] = useState([]);

	const getFuncionario = async () => {
		const response = await axios.get(
			`http://localhost:3001/funcionario/${id}`
		);
		setFuncionario(response.data);
		console.log(response.data);
	};

	const getSetor = async () => {
		const response = await axios.get(
			`http://localhost:3001/setor/${funcionario.setor}`
		);
		setSetor(response.data);
	};

	const handleEdit = async (id) => {
		navigate(`/funcionario/edicao/${id}`);
	};

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:3001/funcionario/${id}`);
		navigate('/funcionario');
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}

		getFuncionario();
	}, [id, navigate]);

	useEffect(() => {
		if (funcionario.setor) {
			getSetor();
		}
	}, [funcionario]);

	return (
		<>
			<TopBar />
			<Container sx={{ marginTop: '1rem' }}>
				<Grid
					container
					spacing={2}
					marginBottom='1rem'
				>
					<Grid
						item
						xs={4}
					>
						<Typography variant='h4'>
							Informações de {funcionario.nome}
						</Typography>
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
								<Tooltip title='Editar'>
									<IconButton
										onClick={() => {
											handleEdit(funcionario.id);
										}}
									>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</Grid>
							<Grid item>
								<Tooltip title='Excluir'>
									<IconButton
										onClick={() => {
											handleDelete(funcionario.id);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</Grid>
							<Grid item>
								<Tooltip title='Voltar'>
									<Link href='/funcionario'>
										<IconButton>
											<VoltarIcon />
										</IconButton>
									</Link>
								</Tooltip>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Container component={Paper}>
					<Grid
						container
						spacing={2}
					>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>ID:</Typography>
							<Typography variant='body2'>
								{funcionario.id}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>Nome:</Typography>
							<Typography variant='body2'>
								{funcionario.nome}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>CPF:</Typography>
							<Typography variant='body2'>
								{funcionario.cpf}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>CNPJ:</Typography>
							<Typography variant='body2'>
								{funcionario.cnpj}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>Conselho:</Typography>
							<Typography variant='body2'>
								{funcionario.conselho}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>
								Número Conselho:
							</Typography>
							<Typography variant='body2'>
								{funcionario.numeroConselho}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>Especialidade:</Typography>
							<Typography variant='body2'>
								{funcionario.especialidade}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>Classificação:</Typography>
							<Typography variant='body2'>
								{funcionario.classificacao}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>CNS:</Typography>
							<Typography variant='body2'>
								{funcionario.cns}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>Faturamento:</Typography>
							<Typography variant='body2'>
								{funcionario.faturamento}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>Convênio:</Typography>
							<Typography variant='body2'>
								{funcionario.convenio}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>Atuação:</Typography>
							<Typography variant='body2'>
								{funcionario.atuacao}
							</Typography>
						</Grid>
						<Grid
							item
							xs={10}
						>
							<Typography variant='h6'>Observação:</Typography>
							<Typography variant='body2'>
								{funcionario.observacao}
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
						>
							<Typography variant='h6'>Setor:</Typography>
							<Typography variant='body2'>
								{setor.nome}
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</Container>
		</>
	);
};

export default Informacoes;
