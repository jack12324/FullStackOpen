interface ExerciseStats {
    totalDays: number;
    trainingDays: number;
    targetHours: number;
    averageDailyHours: number;
    targetReached: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
}
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

export default calculateExercise;