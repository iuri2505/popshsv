import { Button } from '@mui/material';

const SubmitButton = () => {
	return (
		<Button
			type='submit'
			variant='outlined'
			fullWidth
			style={{ marginBottom: '20px' }}
		>
			Enviar
		</Button>
	);
};

export default SubmitButton;
