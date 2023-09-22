import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
