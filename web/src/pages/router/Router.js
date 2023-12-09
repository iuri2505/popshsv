import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormularioFuncionario from '../funcionario/Formulario';
import Login from '../login/Login';
import TabelaFuncionario from '../funcionario/Tabela';
import InformacoesFuncionario from '../funcionario/Informacoes';
import EdicaoFuncionario from '../funcionario/Edicao';
import FormularioPop from '../pop/Formulario';
import TabelaPop from '../pop/Tabela';
import EdicaoPop from '../pop/Edicao';
import InformacoesPop from '../pop/Informacoes';
import TabelaSetor from '../setor/Tabela';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/funcionario/formulario'
					element={<FormularioFuncionario />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/pop/formulario'
					element={<FormularioPop />}
				/>
				<Route
					path='/funcionario/edicao/:id'
					element={<EdicaoFuncionario />}
				/>
				<Route
					path='/'
					element={<TabelaPop />}
				/>
				<Route
					path='/pop/informacoes/:id'
					element={<InformacoesPop />}
				/>
				<Route
					path='/pop/edicao/:id'
					element={<EdicaoPop />}
				/>
				<Route
					path='/funcionario'
					element={<TabelaFuncionario />}
				/>
				<Route
					path='/funcionario/informacoes/:id'
					element={<InformacoesFuncionario />}
				/>
				<Route
					path='/setor'
					element={<TabelaSetor />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
