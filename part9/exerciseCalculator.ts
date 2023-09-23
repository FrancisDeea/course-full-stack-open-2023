// interface exerciseValues {
//   dailyHours: Array<number>;
//   target: number;
// }
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// const parseArguments2 = (args: Array<string>): exerciseValues => {
//   if (args.length < 4)
//     throw new Error(
//       "Not enough arguments. Provide unless a target and a dailyHours"
//     );

//   const numberedArray = args.slice(2).map((i) => Number(i));

//   if (numberedArray.every((i) => !isNaN(i))) {
//     const [target, ...dailyHours] = numberedArray;
//     return {
//       dailyHours,
//       target,
//     };
//   } else {
//     throw new Error("Provided values are not numbers!");
//   }
// };

const calculateExercise = (
  dailyHours: Array<number>,
  target: number
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.reduce(
    (acc, item) => (item > 0 ? acc + 1 : acc),
    0
  );
  const average =
    dailyHours.reduce((acc, item) => acc + item, 0) / periodLength;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = "";

  if (average === 0) {
    rating = 0;
    ratingDescription = "REALLY BAD. YOU MUST START NOW!";
  }

  if (average > 0 && average < target / 2) {
    rating = 1;
    ratingDescription = "It's something, but you must do it better!";
  }

  if (average >= target / 2 && average < target) {
    rating = 2;
    ratingDescription = "You are doing well. Keep going!";
  }

  if (average >= target) {
    rating = 3;
    ratingDescription = "AMAZING. YOU'RE THE BEST";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   const { dailyHours, target } = parseArguments2(process.argv);
//   console.log(calculateExercise(dailyHours, target));
// } catch (err) {
//   if (err instanceof Error) {
//     throw new Error(err.message);
//     console.log(err);
//   }
// }

export default calculateExercise;
