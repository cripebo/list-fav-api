require('dotenv').config();

import express from 'express';
import morgan from 'morgan';
import { connectDB } from './services/db';
import tmdbRouter from './routes/tmdbRouter';
import listRouter from './routes/listfavRouter';
import { notFound } from './utils';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/tmdb', tmdbRouter);
app.use('/api/listfav', listRouter);
app.get('*', notFound);

app.listen(PORT, () => {
    console.debug(`[SERVER] Server  running on port ${PORT}`);
    connectDB();
});