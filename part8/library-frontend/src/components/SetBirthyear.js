import { useState } from "react"

import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"

const SetBirthyear = () => {
    const [name, setName] = useState("")
    const [birthyear, setBirthyear] = useState("")

    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const handleForm = (e) => {
        e.preventDefault()

        updateAuthor({ variables: { name, setBornTo: birthyear } })
        setName("")
        setBirthyear("")
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={handleForm}>
                Name: <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                Born: <input type="number" name="birthyear" value={birthyear} onChange={(e) => setBirthyear(Number(e.target.value))} /> <br />
                <button type="submit">Update author</button>
            </form>
        </div>
    )
}

export default SetBirthyear