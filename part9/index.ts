import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercise from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/greeting", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight)
    return res.status(404).json({ Error: "parameters not found" });

  if (isNaN(Number(height)) || isNaN(Number(weight)))
    return res
      .status(400)
      .json({ Error: "provided parameters are not numbers!" });

  const result = calculateBmi(Number(height), Number(weight));

  return res.json({ weight, height, bmi: result });
});

app.post("/exercises", (req, res) => {
  interface bodyValues {
    daily_exercises: Array<number>;
    target: number;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: bodyValues = req.body;

  if (daily_exercises === undefined || target === undefined)
    return res.json({ error: "parameters missing!" });

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    daily_exercises.some((i) => isNaN(Number(i)))
  )
    return res.json({ error: "malformatted parameters!" });

  const result = calculateExercise(daily_exercises, target);

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
