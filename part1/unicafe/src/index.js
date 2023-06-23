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
        <Statistics text="Good" variable={good} />
        <Statistics text="Neutral" variable={neutral} />
        <Statistics text="Bad" variable={bad} />
        <Statistics text="All" variable={all} />
        <Statistics text="Average" variable={average} />
        <Statistics text="Positive" variable={positive} />
      </div>
    </div>
  )
}

const Statistics = ({text, variable}) => (
  <p>{text}: {variable} {text === "Positive" ? "%" : null}</p>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(<App />,
  document.getElementById('root')
)