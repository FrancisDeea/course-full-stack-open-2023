import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const show = { "display": "" }
  const notShow = { "display": "none" }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={visible ? show : notShow}>
        {props.children}
      </div>
      <div style={visible ? notShow : show}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>
    </>

  )
})

Togglable.displayName = "Togglable"

export default Togglable