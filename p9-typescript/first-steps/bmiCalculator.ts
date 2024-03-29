
export const calculateBmi = (heightCM: number, weightKG: number): string => {
    const bmi = weightKG / Math.pow(heightCM/100, 2);
    if (bmi < 16.0) {
        return "Underweight (Severe thinness)";
    }else if (bmi < 17.0) {
        return "Underweight (Moderate thinness)";
    }else if (bmi < 18.5) {
        return "Underweight (Mild thinness)";
    }else if (bmi < 25.0) {
        return "Normal (Healthy weight)";
    }else if (bmi < 30.0) {
        return "Overweight (Pre-obese)";
    }else if (bmi < 35.0) {
        return "Obese (Class I)";
    }else if (bmi < 40.0) {
        return "Obese (Class II)";
    }else if (bmi >= 40.0) {
        return "Obese (Class III)";
    }else {
        throw new Error(`Unknown input: ${bmi}`);
    }
};