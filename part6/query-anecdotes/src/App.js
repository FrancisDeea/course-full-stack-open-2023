import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './services/anecdoteServices'
import { useQuery } from 'react-query'

const App = () => {

  const getAnecdotesQuery = useQuery('anecdotes', getAnecdotes, { retry: 1 })

  if (getAnecdotesQuery.isLoading) { return <div>Loading...</div> }
  if (getAnecdotesQuery.isError) { return <div>error: {getAnecdotesQuery.error.message}</div> }

  const anecdotes = getAnecdotesQuery.data

  const handleVote = (anecdote) => {  
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
