import React from 'react'
import { TextField, useInput } from 'react-sw-inputs-validation'

const App = () => {
  const input = useInput({
    name: 'name',
    placeholder: 'Enter your name',
    validation: [
      { type: 'isEmail', msg: 'Email is wrong, dude' },
      'required'
    ]
  })

  return (
    <div className="container">
      <TextField {...input.bind} label={'Email input'} validation={input.validation} />
    </div>
  )
}

export default App
