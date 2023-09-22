// interface bmiValues {
//   height: number;
//   weight: number;
// }

// const parseArguments = (args: Array<string>): bmiValues => {
//   if (args.length > 4) throw new Error("Too many arguments");
//   if (args.length < 4) throw new Error("Not enough arguments");

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3]),
//     };
//   } else {
//     throw new Error("Provided values are not numbers!");
//   }
// };

const calculateBmi = (height: number, weight: number): String => {
  const result = weight / Math.pow(height / 100, 2);

  if (result < 16) return "Underweight (Severe thinness)";
  if (result >= 16.0 && result <= 16.9)
    return "Underweight (Moderate thinness)";
  if (result >= 17.0 && result <= 18.4) return "Underweight (Mild thinness)";
  if (result >= 18.5 && result <= 24.9) return "Normal range";
  if (result >= 25.0 && result <= 29.9) return "Overweight (Pre-obese)";
  if (result >= 30.0 && result <= 30.9) return "Obese (Class I)";
  if (result >= 35.0 && result <= 39.9) return "Obese (Class II)";
  return "Obese (Class III)";
};

// try {
//   const { height, weight } = parseArguments(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (err) {
//   console.log(err);
//   throw new Error(`Something went wrong. Error message: ${err.message}`);
// }

export default calculateBmi