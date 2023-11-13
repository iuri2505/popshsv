import { AppBar, Typography, Toolbar, Box } from '@mui/material';
import UserIcon from '@mui/icons-material/AccountCircle';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TopBar = () => {
	const [user, setUser] = useState([]);

	const getUser = async () => {
		const id = localStorage.getItem('funcionario');
		const response = await axios.get(
			`http://localhost:3001/funcionario/${id}`
		);
		setUser(response.data);
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Box>
			<AppBar
				position='static'
				color='inherit'
			>
				<Toolbar>
					<UserIcon fontSize='large' />
					<Typography
						variant='h6'
						sx={{ flexGrow: 1 }}
					>
						{user.nome}
					</Typography>
					<LogoutButton />
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default TopBar;
