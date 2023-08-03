import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        console.log(filter)
        return anecdotes.filter(anecdote => filter ? anecdote.content.toLowerCase().includes(filter) : anecdote)
    })
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    const handleVote = (id) => dispatch(vote(id))

    return (
        <>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList