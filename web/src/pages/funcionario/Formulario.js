import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import {
	Container,
	Typography,
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Grid,
	Paper,
	IconButton,
	Link,
} from '@mui/material';
import VoltarIcon from '@mui/icons-material/ArrowBack';
import SubmitButton from '../../components/SubmitButton';
import TopBar from '../../components/TopBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
	nome: yup.string().required('Nome necessário.'),
	cpf: yup
		.string()
		.required('CPF necessário.')
		.max(11, 'O CPF tem 11 digitos.')
		.min(11, 'O CPF tem 11 digitos.'),
	cnpj: yup
		.string()
		.required('CNPJ necessário')
		.max(14, 'O CNPJ tem 14 digitos.')
		.min(14, 'O CNPJ tem 14 digitos.'),
	setor: yup.number().required('Setor necessário.'),
});

const Formulario = () => {
	const navigate = useNavigate();
	const [setores, setSetores] = useState();

	const getSetor = async () => {
		const response = await axios.get('http://localhost:3001/setor');
		setSetores(response.data);
		console.log(response.data);
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}

		getSetor();
	}, [navigate]);

	const [showDialog, setShowDialog] = useState(false);

	const handleCloseDialog = () => {
		setShowDialog(false);
	};

	const formik = useFormik({
		initialValues: {
			nome: '',
			cpf: '',
			cnpj: '',
			conselho: '',
			numeroConselho: '',
			especialidade: '',
			classificacao: '',
			cns: '',
			convenio: '',
			faturamento: '',
			atuacao: '',
			observacao: '',
			setor: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
			axios.post('http://localhost:3001/funcionario', {
				nome: formik.values.nome,
				cpf: formik.values.cpf,
				cnpj: formik.values.cnpj,
				conselho: formik.values.conselho,
				numeroConselho: formik.values.numeroConselho,
				especialidadeo: formik.values.especialidade,
				classificacao: formik.values.classificacao,
				cns: formik.values.cns,
				convenio: formik.values.convenio,
				faturamento: formik.values.faturamento,
				atuacao: formik.values.atuacao,
				observacao: formik.values.observacao,
				idSetorFK: formik.values.setor,
			});
			setShowDialog(true);
		},
	});

	return (
		<>
			<TopBar />
			<Container sx={{ marginTop: '1rem' }}>
				<Grid
					container
					spacing={2}
					marginBottom='1rem'
				>
					<Grid item>
						<Typography variant='h4'>
							Cadastro Funcionário:
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
							<Grid
								item
								xs={2.15}
							>
								<Link href='/funcionario'>
									<IconButton>
										<VoltarIcon />
										Voltar
									</IconButton>
								</Link>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Container component={Paper}>
					<form onSubmit={formik.handleSubmit}>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={6}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='nome'
									name='nome'
									label='Nome:'
									value={formik.values.nome}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.nome &&
										Boolean(formik.errors.nome)
									}
									helperText={
										formik.touched.nome &&
										formik.errors.nome
									}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='cpf'
									name='cpf'
									label='CPF:'
									value={formik.values.cpf}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.cpf &&
										Boolean(formik.errors.cpf)
									}
									helperText={
										formik.touched.cpf && formik.errors.cpf
									}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='cnpj'
									name='cnpj'
									label='CNPJ:'
									value={formik.values.cnpj}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.cnpj &&
										Boolean(formik.errors.cnpj)
									}
									helperText={
										formik.touched.cnpj &&
										formik.errors.cnpj
									}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='conselho'
									name='conselho'
									label='Conselho:'
									value={formik.values.conselho}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='numeroConselho'
									name='numeroConselho'
									label='Número Conselho:'
									value={formik.values.numeroConselho}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='especialidade'
									name='especialidade'
									label='Especialidade:'
									value={formik.values.especialidade}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='classificacao'
									name='classificacao'
									label='Classificação:'
									value={formik.values.classificacao}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='cns'
									name='cns'
									label='CNS:'
									value={formik.values.cns}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='convenio'
									name='convenio'
									label='Convênio:'
									value={formik.values.convenio}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='faturamento'
									name='faturamento'
									label='Faturamento:'
									value={formik.values.faturamento}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='atuacao'
									name='atuacao'
									label='Atuação:'
									value={formik.values.atuacao}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Grid>
							<Grid
								item
								xs={3}
							>
								<FormControl
									fullWidth
									margin='normal'
									error={
										formik.touched.setor &&
										Boolean(formik.errors.setor)
									}
								>
									<InputLabel id='label-select'>
										Setor:
									</InputLabel>
									<Select
										id='setor'
										name='setor'
										label='setor'
										value={formik.values.setor}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									>
										{setores &&
											setores.map((setor) => (
												<MenuItem
													key={setor.id}
													value={setor.id}
												>
													{setor.nome}
												</MenuItem>
											))}
									</Select>
									{formik.touched.setor &&
									formik.errors.setor ? (
										<FormHelperText>
											{formik.errors.setor}
										</FormHelperText>
									) : null}
								</FormControl>
							</Grid>
							<Grid
								item
								xs={9}
							>
								<TextField
									margin='normal'
									fullWidth
									autoComplete='off'
									id='observacao'
									name='observacao'
									label='Observação:'
									value={formik.values.observacao}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<Grid
									container
									justifyContent='flex-end'
									marginBottom='1rem'
								>
									<Grid
										item
										xs={3}
									>
										<SubmitButton />
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</Container>
			</Container>
			<Dialog
				open={showDialog}
				onClose={handleCloseDialog}
			>
				<DialogTitle>{'Cadastrado com sucesso!'}</DialogTitle>
				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleCloseDialog}
					>
						Fechar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Formulario;
