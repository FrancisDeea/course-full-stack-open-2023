const calculateBmi = (height: number, weight: number): String | number => {
    const result = (weight / (Math.pow(height / 100, 2)))

    if (result < 16) return "Underweight (Severe thinness)"
    if (result >= 16.0 && result <= 16.9) return "Underweight (Moderate thinness)"
    if (result >= 17.0 && result <= 18.4) return "Underweight (Mild thinness)"
    if (result >= 18.5 && result <= 24.9) return "Normal range"
    if (result >= 25.0 && result <= 29.9) return "Overweight (Pre-obese)"
    if (result >= 30.0 && result <= 30.9) return "Obese (Class I)"
    if (result >= 35.0 && result <= 39.9) return "Obese (Class II)"
    if (result >= 40.0) return "Obese (Class III)"
}

console.log(calculateBmi(180, 75))