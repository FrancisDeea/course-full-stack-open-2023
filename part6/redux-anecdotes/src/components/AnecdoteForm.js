import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { handleNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""

        dispatch(createAnecdote(content))
        dispatch(handleNotification("A new anecdote was created!", 5))
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