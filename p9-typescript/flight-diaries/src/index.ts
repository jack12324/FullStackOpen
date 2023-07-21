import express from 'express';
const app = express();
app.use(express.json());
import diariesRouter from "./routes/diaries";

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/diaries', diariesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});