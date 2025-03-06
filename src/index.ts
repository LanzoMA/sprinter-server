import express from 'express';
import { connectDB } from './db';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const app: express.Express = express();
const PORT: number = 5000;

app.use(express.json({ limit: '10mb' }));
app.use('/', router());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
