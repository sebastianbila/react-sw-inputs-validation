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
