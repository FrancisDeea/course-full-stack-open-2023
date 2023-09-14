import { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ show, setPage, setToken }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error)
        },
    })

    const handleLogin = (e) => {
        e.preventDefault()
        login({ variables: { username, password } })
        setUsername("")
        setPassword("")
        setPage('authors')
    }

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem("token", token)
        }
    }, [result.data]) //eslint-disable-line

    if (!show) return null

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>
                    Username
                    <input type="text" onChange={({ target }) => setUsername(target.value)} value={username} />
                </label>

                <label>
                    Password
                    <input type="text" onChange={({ target }) => setPassword(target.value)} value={password} />
                </label>

                <button type="submit">Login in</button>
            </form>
        </div>
    )
}

export default Login