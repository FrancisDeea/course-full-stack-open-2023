const Comments = ({ comments }) => {

    if (!comments) return null
    return (
        <ul>
            {
                comments.map(item => <li key={item.value}>{item.value}</li>)
            }
        </ul>
    )
}

export default Comments