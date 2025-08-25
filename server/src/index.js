import dotenv from 'dotenv';
import app from './app.js';
import { connectDB, disconnectDB } from './db.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`API listening on ${PORT}`)))
    .catch(err => {
        console.error('Mongo connection failed', err);
        process.exit(1); // exit(0) → Indicates successful execution| exit(1) → Indicates an error or abnormal termination. 
    });

