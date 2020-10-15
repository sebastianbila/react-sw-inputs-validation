import { useState } from 'react'
import { Validator } from '../utils/Validator'

export function useValidation(options) {
  const validator = new Validator()
  const [status, setStatus] = useState({
    isValid: true,
    isTouched: false,
    msg: ''
  })

  const setTouched = () => setStatus({ ...status, isTouched: true })

  const validate = (value) => {
    /* Mark field as touched */
    setTouched()

    let isValid = true
    let msg = ''
    let args = {}

    if (options) {
      options.forEach((option) => {
        const key = option.type || option

        /* Pass value to args */
        args = { ...option, value }
        if (validator[key]) {
          /* Validate by args */
          const result = validator[key](args)

          if (result && !result.isValid) {
            isValid = result.isValid
            msg = result.msg
          }

          /* Set validation status */
          setStatus({ isTouched: true, isValid, msg })
        } else throw new Error(`Type -${key}- not provided for validation`)
      })
    }
    return status
  }

  const onBlur = (event) => validate(event.target.value)

  const isValid = () => ({ isValid: status.isValid, msg: status.msg })

  return {
    onBlur,
    validate,
    isValid,
    setTouched,
    status,
    setStatus
  }
}
