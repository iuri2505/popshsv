import express from 'express';
import cors from 'cors';
import db from './config/database.config.js';
import routesFuncionario from './routes/funcionario.routes.js';
import routesSetor from './routes/setor.routes.js';
import routesPop from './routes/pop.routes.js';

const app = express();

try {
	await db.authenticate();
	console.log('connected to database');
} catch (error) {
	console.log('connection error: ', error);
}

app.use(cors());
app.use(express.json());
app.use('/funcionario', routesFuncionario);
app.use('/setor', routesSetor);
app.use('/pop', routesPop);

app.listen(3001, () => console.log('server running at port 3001'));
