import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Informacoes = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [funcionario, setFuncionario] = useState([]);
	const [setor, setSetor] = useState([]);
	const [pop, setPop] = useState([]);

	const getPop = async () => {
		const response = await axios.get(`http://localhost:3001/pop/${id}`);
		setPop(response.data);
	};

	const getFuncionario = async (id) => {
		const response = await axios.get(
			`http://localhost:3001/funcionario/${id}`
		);
		setFuncionario(response.data);
	};

	const getSetor = async (id) => {
		const response = await axios.get(`http://localhost:3001/setor/${id}`);
		setSetor(response.data);
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}

		getPop();
	}, [navigate]);

	useEffect(() => {
		if (pop.idFuncionarioFK && pop.idSetorFK) {
			getFuncionario(pop.idFuncionarioFK);
			getSetor(pop.idSetorFK);
		}
	}, [pop.idFuncionarioFK, pop.idSetorFK]);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={3}
				>
					<Typography variant='h6'>ID:</Typography>
					<Typography variant='body2'>{pop.id}</Typography>
				</Grid>
				<Grid
					item
					xs={3}
				>
					<Typography variant='h6'>Titulo:</Typography>
					<Typography variant='body2'>{pop.titulo}</Typography>
				</Grid>
				<Grid
					item
					xs={10}
				>
					<Typography variant='h6'>Objetivo:</Typography>
					<Typography variant='body2'>{pop.objetivo}</Typography>
				</Grid>
				<Grid
					item
					xs={10}
				>
					<Typography variant='h6'>Procedimentos:</Typography>
					<Typography variant='body2'>{pop.procedimentos}</Typography>
				</Grid>
				<Grid
					item
					xs={3}
				>
					<Typography variant='h6'>Funcionario:</Typography>
					<Typography variant='body2'>{funcionario.nome}</Typography>
				</Grid>
				<Grid
					item
					xs={3}
				>
					<Typography variant='h6'>Setor:</Typography>
					<Typography variant='body2'>{setor.nome}</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default Informacoes;
