import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { handleNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        console.log(filter)
        return anecdotes.filter(anecdote => filter ? anecdote.content.toLowerCase().includes(filter) : anecdote)
    })
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    const handleVote = (anecdote) => {
        dispatch(updateAnecdote(anecdote))
        dispatch(handleNotification(`You voted "${anecdote.content}"`, 5))
    }

    return (
        <>
            {sortedAnecdotes.map(anecdote =>
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
        </>
    )
}

export default AnecdoteList