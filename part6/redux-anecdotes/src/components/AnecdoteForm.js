import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        dispatch(createAnecdote(content))
        e.target.anecdote.value = ""
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </>

    )
}

export default AnecdoteForm