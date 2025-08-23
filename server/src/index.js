import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './db.js';
import { notFound, errorHandler } from './middleware/error.js';
import assetRoutes from './routes/assets.js'; // API route handler

dotenv.config();

const app = express();
app.use(morgan('dev')); // Morgan is a HTTP request logger middleware.
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' })); // Cross-Origin Resource Sharing. It controls which domains are allowed to make requests to your server from a different origin.
app.use(express.json()); // express.json() is built-in middleware in Express. It parses incoming requests with JSON payloads and makes the data available on req.body

app.get('/api/health', (req, res) => res.json({ok: true}));
app.use('/api/assets', assetRoutes); // assetRoutes: route handler

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`API listening on ${PORT}`)))
    .catch(err => {
        console.error('Mongo connection failed', err);
        process.exit(1); // exit(0) → Indicates successful execution| exit(1) → Indicates an error or abnormal termination. 
    });

