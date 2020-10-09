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

Then, you need to bind input to TextField. There are two ways for binding:
- bind (simple binding)
- bindV (binding with validation)

```jsx
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
```

## License

MIT © [sebastianbila](https://github.com/sebastianbila)
