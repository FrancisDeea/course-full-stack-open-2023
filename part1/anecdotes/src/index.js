import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// anecdotes is declared out of component, and is passed as props to App component.
const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0); // selected state will be an index gererated randomly
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0)) // points is an array record to keep quote's votes
  const indexMaxPoint = points.indexOf(Math.max(...points)) // index with highest value of votes

  const handleNext = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy)
  }

  return (
    <>
      <h2>Anecdote of the day</h2>

      <div>
        {anecdotes[selected]}
      </div>
      <p>This Quote has {points[selected]} votes.</p>
      <Button text="Vote" handleClick={handleVote} />
      <Button text="Next Quote" handleClick={handleNext} />

      <h2>Anecdote with most votes</h2>
      {anecdotes[indexMaxPoint]}
      <p>This Quote has {points[indexMaxPoint]} votes.</p>
    </>
  )
}

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)