import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/error.js';
import assetRoutes from './routes/assets.js';
 
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*'}));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true}));
app.use('/api/assets', assetRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;


