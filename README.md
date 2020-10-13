# react-sw-inputs-validation

> A simple react module for form inputs validation

[![NPM](https://img.shields.io/npm/v/react-sw-inputs-validation.svg)](https://www.npmjs.com/package/react-sw-inputs-validation) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-sw-inputs-validation
```

## Usage

Before you start, I recommend to import base styles to **index.js**
```jsx
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Import styles
import 'react-sw-inputs-validation/dist/index.css'

ReactDOM.render(<App />, document.getElementById('root'))
```


For usage, you must to import ***useInput*** hook,
and pass parameters to hook.

There is one required parameter - ***name***. You always must provide the name of input

Then, you need to bind input to TextField. For this you can use {...input.bind}.
Also, for using validation, you need to pass validation as props to TextField

```jsx
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


```


You can also use your own field.
To do this, pass the validation as props to the input, and bind the base input props.
Here an example, how you can you custom input


```jsx
import React from 'react'
import styles from '../styles.module.css'

const INVALID_VALUE = 'Invalid value'

export default function TextField(props) {
  const {
    type,
    placeholder,
    value,
    onChange,
    label,
    id,
    className,
    validation
  } = props

  const htmlFor = id || `${type}-${Math.random()}`

  // It used in validation
  let invalid = false

  //Error message
  let errorMsg = INVALID_VALUE

  // Validation return object with 2 params: {isValid, msg}
  // Use it for your own
  if (validation) {
    invalid = !validation.isValid
    errorMsg = validation.msg
  }

  return (
    <div className={className || styles.TextField}>
      <label className={invalid ? styles.invalid : null} htmlFor={htmlFor}>
        {label || 'Label'}
      </label>

      <input
        className={invalid ? styles.invalid : null}
        type={type || 'text'}
        id={htmlFor}
        placeholder={placeholder || ''}
        value={value}
        onChange={onChange}
        {...props}
      />

      {invalid ? <span>{errorMsg}</span> : null}
    </div>
  )
}

```

## License

MIT © [sebastianbila](https://github.com/sebastianbila)
