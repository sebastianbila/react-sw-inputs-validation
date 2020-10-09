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
    validation,
    fieldstyles,
    className
  } = props

  const htmlFor = id || `${type}-${Math.random()}`
  let invalidInputStyle = null
  let invalid = false
  let error = INVALID_VALUE

  let localStyles = { labelStyle: {}, inputStyle: {}, spanStyle: {} }
  if (fieldstyles) {
    localStyles = { ...fieldstyles }
  }

  if (validation) {
    const isInvalid = (v) => !v.valid && v.shouldValidate && v.touched

    if (isInvalid(validation)) invalidInputStyle = styles.invalid
    invalid = isInvalid(validation)
    error = validation.errorMessage || INVALID_VALUE
  }

  return (
    <div className={className || styles.TextField}>
      <label style={localStyles.labelStyle} htmlFor={htmlFor}>
        {label || 'Label'}
      </label>

      <input
        className={invalidInputStyle}
        type={type || 'text'}
        id={htmlFor}
        placeholder={placeholder || 'Default placeholder'}
        value={value}
        onChange={onChange}
        style={localStyles.inputStyle}
        {...props}
      />

      {invalid ? <span style={localStyles.spanStyle}>{error}</span> : null}
    </div>
  )
}
