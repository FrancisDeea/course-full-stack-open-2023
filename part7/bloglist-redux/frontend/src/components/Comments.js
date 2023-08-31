const Comments = ({ comments }) => {

    if (!comments) return null
    return (
        <div>
            <h2 className="mb-2">Latest Comments</h2>
            <ul className="flex flex-col gap-3">
                {
                    comments.map(item => {
                        return (
                            <li className='py-2 px-3 rounded-2xl bg-slate-500 text-neutral-50 font-semibold' key={item.value}>
                                <p className='text-sm'>{item.username} said:</p>{item.value}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Comments