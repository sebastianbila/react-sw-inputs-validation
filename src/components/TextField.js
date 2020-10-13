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
    validation,
    parentstyle,
    labelstyle
  } = props

  const htmlFor = id || `${type}-${Math.random()}`

  let invalid = false
  let errorMsg = INVALID_VALUE

  if (validation) {
    invalid = !validation.isValid
    errorMsg = validation.msg
  }

  return (
    <div className={className || styles.TextField} style={parentstyle}>
      <label
        className={invalid ? styles.invalid : null}
        htmlFor={htmlFor}
        style={labelstyle}
      >
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
