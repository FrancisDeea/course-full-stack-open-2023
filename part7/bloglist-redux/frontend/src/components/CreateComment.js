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
        <form
            onSubmit={handleForm}
            className='flex gap-2'
        >
            <input className="w-[80%] h-8 inline-block border-none placeholder:font-semibold" placeholder="Add a new comment..." {...comment} />
            <button className="w-[20%] h-8 bg-gray-200 rounded-lg" type="submit">Send!</button>
        </form>
    )
}

export default CreateComment