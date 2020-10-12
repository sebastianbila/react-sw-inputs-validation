import { useState } from 'react'
import { useValidation } from './useValidation'

export function useInput(options) {
  if (!options) throw new Error('At least one option [name] must be provided')
  if (!options.name) throw new Error('Name must be provided')

  const type = options.type || 'text'
  const id = options.id || `${type}-${Date.now()}`
  const name = options.name
  const placeholder = options.placeholder || ''
  const [value, setValue] = useState(options.value || '')
  const validation = useValidation(options.validation)

  /* Input on change */
  const onChange = (event) => {
    const $value = event.target.value
    validation.validate($value)
    setValue($value)
  }

  /* If input is valid */
  const isValid = validation.isValid()

  /* When input was touched */
  const onBlur = (event) => validation.onBlur(event)

  /* Clear input */
  const clear = () => setValue('')

  const bind = { type, id, name, placeholder, value, onChange, onBlur }

  return {
    bind,
    type,
    id,
    name,
    placeholder,
    value,
    onBlur,
    validation: isValid,
    status: validation.status,
    onChange,
    clear
  }
}
