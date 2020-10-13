import React from 'react'
import { TextField, useInput, useForm } from 'react-sw-inputs-validation'

const App = () => {

  const inputs = [
    { name: 'firstName', placeholder: 'First name *', label: 'First name', validation: ['required'] },
    { name: 'lastName', placeholder: 'Last name', label: 'Last name' },
    { name: 'email', placeholder: 'Email address *', label: 'Email address', validation: ['isEmail'] },
    { type: 'number', name: 'phone', placeholder: 'Phone number*', label: 'Phone number' },
    { type: 'checkbox', name: 'box', checked: false, label: 'Are you 18+?', validation: ['checked'] }
  ]

  const renderInputs = inputs.map((item, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const input = useInput({ ...item })

    inputs[index] = input

    let labelStyle, style
    if (item.type === 'checkbox') {
      labelStyle = { display: 'inline-block' }
      style = { display: 'inline-block', width: '1%' }
    }
    return (
      <TextField
        key={index}
        labelstyle={labelStyle}
        style={style}
        {...input.bind}
        label={item.label}
        validation={input.validation} />
    )
  })

  const form = useForm(inputs)

  return (
    <>
      <div className="wrapper">
        <form name="example-form" action="" method="post">
          <div className="row">
            {renderInputs}
            <button type='button' disabled={!form.isFormValid}>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
