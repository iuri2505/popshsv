import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	Paper,
	IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tabela = () => {
	const navigate = useNavigate();
	const [setores, setSetores] = useState([]);

	const getSetores = async () => {
		const response = await axios.get('http://localhost:3001/setor');
		setSetores(response.data);
	};

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:3001/setor/${id}`);
		getSetores();
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}
		getSetores();
	}, [navigate]);

	return (
		<TableContainer component={Paper}>
			<Table aria-label='setores'>
				<TableHead>
					<TableRow>
						<TableCell>ID:</TableCell>
						<TableCell>Nome:</TableCell>
						<TableCell>Excluir:</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{setores.map((setor) => (
						<TableRow>
							<TableCell>{setor.id}</TableCell>
							<TableCell>{setor.nome}</TableCell>
							<TableCell>
								<IconButton
									className='delete-icon'
									aria-label='excluir'
									onClick={() => handleDelete(setor.id)}
								>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Tabela;
