interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (week: Array<number>, target: number): Result => {
  const periodLength = week.length;

  if (periodLength !== 7) {
    throw new Error(
      "Invalid period length of week. Insert an array of 7 elements"
    );
  }

  const trainingDays = week.reduce((acc, item) => (item > 0 ? acc + 1 : acc), 0);
  const average = week.reduce((acc, item) => acc + item, 0) / 7;
  const success = average >= target;
  let rating;
  let ratingDescription;

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

console.log(calculateExercise([2, 1.5, 2, 2, 2, 4, 1], 2));
