import express from 'express';
import cors from 'cors';
import db from './config/database.config.js';
import Routes from './routes/routes.js';

const app = express();

try {
	await db.authenticate();
	console.log('connected to database');
} catch (error) {
	console.log('connection error: ', error);
}

app.use(cors());
app.use(express.json());
app.use('/funcionarios', Routes);

app.listen(3001, () => console.log('server running at port 3001'));
