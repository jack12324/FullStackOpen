interface ExerciseStats {
    totalDays: number;
    trainingDays: number;
    targetHours: number;
    averageDailyHours: number;
    targetReached: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
}
interface Arguments{
    dailyExerciseHours: number[];
    targetDailyExerciseHours: number;
}
const parseArgs = (args: string[]): Arguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const dailyExerciseHours = args.slice(3).map(s => Number(s));
    const noNaNs = dailyExerciseHours.reduce((all, current) => all && !isNaN(current), true);

    if (!isNaN(Number(args[2])) && noNaNs) {
        return {
            targetDailyExerciseHours: Number(args[2]),
            dailyExerciseHours
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};
const calculateExercise = (dailyExerciseHours: number[], targetDailyExerciseHours: number): ExerciseStats => {
    const averageDailyHours = dailyExerciseHours.reduce((sum, current) => sum + current, 0)/dailyExerciseHours.length;
    const rating = averageDailyHours >= targetDailyExerciseHours ? 3 : averageDailyHours > targetDailyExerciseHours * .75 ? 2 : 1;
    const ratingDescription = rating === 1 ? "met less than 75% of training goal" : rating === 2 ? "met between 75% and 100% of training goal" : "met training goal";

    return {
        totalDays: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.filter(d => d > 0).length,
        targetHours: targetDailyExerciseHours,
        averageDailyHours,
        targetReached: averageDailyHours >= targetDailyExerciseHours,
        rating,
        ratingDescription
    };
};
try {
    const { dailyExerciseHours, targetDailyExerciseHours} = parseArgs(process.argv);
    console.log(calculateExercise(dailyExerciseHours, targetDailyExerciseHours));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}


export default calculateExercise;