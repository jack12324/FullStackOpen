import express from 'express';
import {calculateBmi } from "./bmiCalculator";
import {calculator, Operation} from "./calculator";
import calculateExercise from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if(!height || !weight || isNaN(height) || isNaN(weight)){
        res.status(400).json({error: 'malformed parameters'});
        return;
    }
    res.status(200).json({
        weight,
        height,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {value1, value2, op} = req.body;

    if(!value1|| !value2|| !op || isNaN(Number(value1)) || isNaN(Number(value2))){
        res.status(400).json({error: 'malformed parameters'});
        return;
    }

    const result = calculator(Number(value1), Number(value2), op as Operation);
    res.send({result});
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {target, dailyExercises} = req.body;

    if(!target|| !dailyExercises){
        res.status(400).json({error: 'parameters missing'});
        return;
    }

    const dailyExercisesNumber = (dailyExercises as string[]).map(s => Number(s));
    const noNaNs = dailyExercisesNumber.reduce((all, current) => all && !isNaN(current), true);

    if(isNaN(Number(target)) || !noNaNs){
        res.status(400).json({error: 'malformed parameters'});
        return;
    }

    const result = calculateExercise(dailyExercisesNumber, Number(target));
    res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});