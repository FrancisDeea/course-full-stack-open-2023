import { useState } from "react"

const useField = (type, name) => {
    const [value, setValue] = useState("")

    const onChange = (e) => setValue(e.target.value)

    const reset = () => setValue("")

    return {
        type,
        name,
        onChange,
        reset,
        value
    }
}

export default useField