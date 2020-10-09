import { Validator } from './validator'

const validator = new Validator()

export function validate(value, validation) {
  if (!validation) return true
  let isValid = true
  let msg = ''
  let key = null
  let options = {}

  validation.forEach((item) => {
    if (typeof item !== 'string' && typeof item !== 'object')
      throw new Error('The method only receive object or string')

    typeof item === 'object' ? (key = item.type) : (key = item)

    options = { ...item, value }
    if (validator[key]) {
      const result = validator[key](options)

      if (result && !result.isValid) {
        isValid = result.isValid
        msg = result.msg
      }
    } else throw new Error(`Type -${key}- not provided for validation`)
  })
  return { isValid, msg }
}
