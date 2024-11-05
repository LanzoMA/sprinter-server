import express from 'express';

const app: express.Express = express();
const PORT: number = 5000;

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
