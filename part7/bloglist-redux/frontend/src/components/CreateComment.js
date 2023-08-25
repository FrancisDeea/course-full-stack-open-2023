import useField from '../hooks/useField'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CreateComment = ({ id }) => {
    const dispatch = useDispatch()
    const { reset: resetComment, ...comment } = useField("text", "comment")

    const handleForm = (e) => {
        e.preventDefault()
        resetComment()

        dispatch(addComment({ value: comment.value }, id))
    }

    return (
        <form onSubmit={handleForm}>
            <input placeholder="Add a new comment..." {...comment} />
            <button type="submit">Send!</button>
        </form>
    )
}

export default CreateComment