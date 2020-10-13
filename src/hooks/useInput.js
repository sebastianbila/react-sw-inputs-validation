import { useState } from 'react'
import { useValidation } from './useValidation'

export function useInput(options) {
  if (!options) throw new Error('At least one option [name] must be provided')
  if (!options.name) throw new Error('Name must be provided')

  const type = options.type || 'text'
  const id = options.id || `${type}-${Date.now()}`
  const name = options.name
  const placeholder = options.placeholder || ''
  const [checked, setChecked] = useState(options.checked)
  const [value, setValue] = useState(options.value || '')
  const validation = useValidation(options.validation)

  /* Input on change */
  const onChange = (event) => {
    validation.setTouched()

    const $value = event.target.value
    validation.validate($value)

    if (type === 'checkbox') {
      const v = !checked
      validation.validate(v)
      setChecked(v)
    }
    setValue($value)
  }

  /* When input was touched */
  const onBlur = (event) => {
    if (type === 'checkbox') return
    validation.onBlur(event)
  }

  /* Is input valid */
  const isValid = validation.isValid()

  /* Clear input */
  const clear = () => setValue('')

  const bind = { type, id, name, placeholder, value, onChange, onBlur }

  const args = {
    bind,
    type,
    id,
    name,
    placeholder,
    value,
    status: validation.status,
    validation: isValid,
    onBlur,
    onChange,
    clear
  }

  if (type === 'checkbox') {
    bind.checked = checked
    args.checked = checked
  }

  return {
    bind,
    ...args
  }
}
