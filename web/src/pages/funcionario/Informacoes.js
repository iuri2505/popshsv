import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Informacoes = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [funcionario, setFuncionario] = useState([]);
	const [setor, setSetor] = useState([]);

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}

		const getFuncionario = async () => {
			const response = await axios.get(
				`http://localhost:3001/funcionario/${id}`
			);
			setFuncionario(response.data);
			console.log(response.data);
		};

		getFuncionario();
	}, [id, navigate]);

	useEffect(() => {
		if (funcionario.idSetorFK) {
			console.log('never back down never what?');
			const getSetor = async () => {
				const response = await axios.get(
					`http://localhost:3001/setor/${funcionario.idSetorFK}`
				);
				setSetor(response.data);
			};

			getSetor();
		}
	}, [funcionario.idSetorFK]);

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
					<Typography variant='body2'>{funcionario.id}</Typography>
				</Grid>
				<Grid
					item
					xs={3}
				>
					<Typography variant='h6'>Nome:</Typography>
					<Typography variant='body2'>{funcionario.nome}</Typography>
				</Grid>
				<Grid
					item
					xs={3}
				>
					<Typography variant='h6'>CPF:</Typography>
					<Typography variant='body2'>{funcionario.cpf}</Typography>
				</Grid>
				<Grid
					item
					xs={3}
				>
					<Typography variant='h6'>CNPJ:</Typography>
					<Typography variant='body2'>{funcionario.cnpj}</Typography>
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
					<Typography variant='h6'>Número Conselho:</Typography>
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
					<Typography variant='body2'>{funcionario.cns}</Typography>
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
					<Typography variant='body2'>{setor.nome}</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default Informacoes;
