import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './reducers/NotificationContext'
import { getAnecdotes, updateAnecdote } from './services/anecdoteServices'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const getAnecdotesQuery = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedData) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id !== updatedData.id ? anecdote : updatedData));
      dispatch({ type: "SET_NOTIFICATION", payload: `The anecdote ${updatedData.content} was voted successfully` })
      setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 5000)
    },
    onError: (error) => {
      dispatch({ type: "SET_NOTIFICATION", payload: error.response.data.error })
      setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 5000)
    }
  })

  if (getAnecdotesQuery.isLoading) { return <div>Loading...</div> }
  if (getAnecdotesQuery.isError) { return <div>error: {getAnecdotesQuery.error.message}</div> }

  const anecdotes = getAnecdotesQuery.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
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
