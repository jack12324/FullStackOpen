import express from 'express';
import cors from 'cors';
const app = express();
import diariesRouter from "./routes/diaries";


// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/diaries', diariesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});