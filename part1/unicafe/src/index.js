import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = (good * 100) / all || 0

  return (
    <div>
      <div>
        <h2>Give Feedback</h2>
        <Button text="Good" handleClick={() => setGood(good + 1)} />
        <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      </div>

      <div>
        <h2>Statistics</h2>
        {
          good || neutral || bad
            ? (
              <>
                <Statistic text="Good" value={good} />
                <Statistic text="Neutral" value={neutral} />
                <Statistic text="Bad" value={bad} />
                <Statistic text="All" value={all} />
                <Statistic text="Average" value={average} />
                <Statistic text="Positive" value={positive} />
              </>
            )
            : "No feedback given"
        }

      </div>
    </div>
  )
}

const Statistic = ({ text, value }) => (
  <p>{text}: {value} {text === "Positive" ? "%" : null}</p>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(<App />,
  document.getElementById('root')
)