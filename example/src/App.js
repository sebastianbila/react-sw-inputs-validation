import React from 'react'
import { TextField, useInput } from 'react-sw-inputs-validation'

const App = () => {
  const input = useInput({
    label: 'Email: ',
    name: 'email',
    placeholder: 'Enter your email',
    validation: {
      shouldValidate: true,
      options: [
        'isEmail',
        'required',
        {type: 'minLength', min: 5, msg: 'Min length is 5'}
      ]
    }
  })

  return (
    <div className="container">
      <TextField  {...input.bindV} />
    </div>
  )
}

export default App
