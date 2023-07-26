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
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
      <div style={visible ? notShow : show}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>
    </>

  )
})

export default Togglable