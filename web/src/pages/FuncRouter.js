import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Form';
import Login from './Login';

const FuncRouter = () => {
	return (
		<Router>
			<Routes>
				<Route
					exact
					path='/'
					element={<Form />}
				/>
				<Route
					exact
					path='/login'
					element={<Login />}
				/>
			</Routes>
		</Router>
	);
};

export default FuncRouter;
