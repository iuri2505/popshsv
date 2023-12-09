import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import {
	Container,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Grid,
	Paper,
	Link,
	Tooltip,
	IconButton,
} from '@mui/material';
import SubmitButton from '../../components/SubmitButton';
import VoltarIcon from '@mui/icons-material/ArrowBack';
import TopBar from '../../components/TopBar';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const validationSchema = yup.object({
	titulo: yup.string().required('Titulo necessário.'),
	objetivo: yup.string().required('Objetivo necessário.'),
	procedimentos: yup.string().required('Procedimentos necessários.'),
	setor: yup.number().required('Setor necessário'),
});

const Edicao = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [pop, setPop] = useState({
		id: '',
		titulo: '',
		objetivo: '',
		procedimentos: '',
		idSetorFK: '',
	});
	const [setores, setSetores] = useState();

	const getPop = async () => {
		const response = await axios.get(`http://localhost:3001/pop/${id}`);
		setPop(response.data);
	};

	const getSetor = async () => {
		const response = await axios.get('http://localhost:3001/setor');
		setSetores(response.data);
	};

	useEffect(() => {
		const funcionarioLogado = localStorage.getItem('funcionario');
		if (!funcionarioLogado) {
			navigate('/login');
		}

		getPop();
		getSetor();
	}, [navigate, id]);

	useEffect(() => {
		if (pop) {
			formik.setValues({
				titulo: pop.titulo,
				objetivo: pop.objetivo,
				procedimentos: pop.procedimentos,
				setor: pop.idSetorFK,
			});
			console.log(pop.setor);
		}
	}, [pop]);

	const formik = useFormik({
		initialValues: {
			titulo: '',
			objetivo: '',
			procedimentos: '',
			setor: '',
		},

		validationSchema: validationSchema,

		onSubmit: async (values) => {
			console.log(values);

			await axios.put('http://localhost:3001/pop/', {
				id: pop.id,
				titulo: formik.values.titulo,
				objetivo: formik.values.objetivo,
				procedimentos: formik.values.procedimentos,
				idFuncionarioFK: localStorage.getItem('funcionario'),
				idSetorFK: formik.values.setor,
			});
			navigate('/');
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
					<Grid
						item
						xs={4}
					>
						<Typography variant='h4'>
							Editar {pop.titulo}
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
							<Grid item>
								<Tooltip title='Voltar'>
									<Link href='/'>
										<IconButton>
											<VoltarIcon />
										</IconButton>
									</Link>
								</Tooltip>
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
									fullWidth
									autoComplete='off'
									id='titulo'
									name='titulo'
									label='Titulo:'
									value={formik.values.titulo}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.titulo &&
										Boolean(formik.errors.titulo)
									}
									helperText={
										formik.touched.titulo &&
										formik.errors.titulo
									}
								/>
							</Grid>
							<Grid
								item
								xs={6}
							>
								{
									<FormControl
										fullWidth
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
								}
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									fullWidth
									autoComplete='off'
									id='objetivo'
									name='objetivo'
									label='Objetivo:'
									value={formik.values.objetivo}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.objetivo &&
										Boolean(formik.errors.objetivo)
									}
									helperText={
										formik.touched.objetivo &&
										formik.errors.objetivo
									}
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									fullWidth
									multiline
									rows={4}
									autoComplete='off'
									id='procedimentos'
									name='procedimentos'
									label='Procedimentos:'
									value={formik.values.procedimentos}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.procedimentos &&
										Boolean(formik.errors.procedimentos)
									}
									helperText={
										formik.touched.procedimentos &&
										formik.errors.procedimentos
									}
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
		</>
	);
};

export default Edicao;
