import express from 'express';
import { connectDB } from './db/models';

connectDB();

const app: express.Express = express();
const PORT: number = 5000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
