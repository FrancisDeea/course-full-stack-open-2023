import anecdoteServices from "../services/anecdoteServices"
import { useDispatch } from "react-redux"
import { create } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""
        anecdoteServices
            .createAnecdote(content)
            .then(anecdote => {
                dispatch(create(anecdote))
                dispatch(setNotification("A new anecdote was created!"))
                setTimeout(() => dispatch(clearNotification()), 5000)
            })
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