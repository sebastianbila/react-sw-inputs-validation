import { useState } from 'react'
import { validate } from '../utils/validation'

export function useInput(options) {
  if (!options) throw new Error('At least one [name] must be provided')
  if (!options.name) throw new Error('Name must be provided')

  const [type] = useState(options.type || 'text')
  const [name] = useState(options.name)
  const [placeholder] = useState(options.placeholder || 'Default Placeholder')
  const [label] = useState(options.label || 'Label')
  const [id] = useState(options.id || `${type}-${Math.random()}`)
  const [value, setValue] = useState(options.value || '')

  const inputValidation = options.validation || {}

  const [validation, setValidation] = useState({
    valid: inputValidation.valid || true,
    shouldValidate: inputValidation.shouldValidate || false,
    touched: inputValidation.touched || false,
    errorMessage: inputValidation.errorMessage || 'Invalid value',
    options: inputValidation.options
  })

  /* Input on change */
  const onChange = (event) => {
    const $value = event.target.value
    const $params = validation.options

    if (validation.shouldValidate) {
      const $validate = validate($value, $params)

      setValidation({
        ...validation,
        touched: true,
        valid: $validate.isValid,
        errorMessage: $validate.msg
      })
    } else {
      setValidation({
        ...validation,
        touched: true,
        valid: true
      })
    }

    setValue($value)
  }

  /* Clear input */
  const clear = () => setValue('')

  const bind = { name, placeholder, value, label, id, onChange }

  return {
    bind,
    bindV: { ...bind, validation },
    name,
    value,
    clear,
    validation
  }
}
