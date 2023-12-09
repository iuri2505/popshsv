import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const DeleteButton = (onDelete) => {
	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:3001/${id}`);
	};

	return (
		<Tooltip title='Excluir'>
			<IconButton>
				<DeleteIcon />
			</IconButton>
		</Tooltip>
	);
};
