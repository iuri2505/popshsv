import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		navigate('/login');
	};

	return (
		<Button
			color='inherit'
			onClick={handleLogout}
		>
			Sair
		</Button>
	);
};

export default LogoutButton;
