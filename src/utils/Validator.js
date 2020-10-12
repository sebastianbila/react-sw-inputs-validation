import is from 'is_js'
import {
  INVALID_ALPHA_NUMERIC,
  INVALID_CREDIT_CARD,
  INVALID_DATA,
  INVALID_DATE_STRING,
  INVALID_EMAIL,
  INVALID_HEX_COLOR,
  INVALID_IP,
  INVALID_IPV4,
  INVALID_IPV6,
  INVALID_TIME_STRING,
  INVALID_URL,
  MIN_LENGTH,
  MIN_LENGTH_REQUIRED,
  REGEX_REQUIRED,
  REQUIRED
} from './errorMessage'

function preparedResult(isValid, msg) {
  return { isValid, msg }
}

export class Validator {
  required(args) {
    const msg = args.msg || REQUIRED
    return preparedResult(is.not.empty(args.value), msg)
  }

  minLength(args) {
    if (!args.min) throw new Error(MIN_LENGTH_REQUIRED)
    const msg = args.msg || MIN_LENGTH(args.min)
    return preparedResult(args.value.length >= args.min, msg)
  }

  isUrl(args) {
    const msg = args.msg || INVALID_URL
    return preparedResult(is.url(args.value), msg)
  }

  isEmail(args) {
    const msg = args.msg || INVALID_EMAIL
    return preparedResult(is.email(args.value), msg)
  }

  isCreditCard(args) {
    const msg = args.msg || INVALID_CREDIT_CARD
    return preparedResult(is.creditCard(args.value), msg)
  }

  isAlphaNumeric(args) {
    const msg = args.msg || INVALID_ALPHA_NUMERIC
    return preparedResult(is.alphaNumeric(args.value), msg)
  }

  isDateString(args) {
    const msg = args.msg || INVALID_DATE_STRING
    return preparedResult(is.dateString(args.value), msg)
  }

  isTimeString(args) {
    const msg = args.msg || INVALID_TIME_STRING
    return preparedResult(is.timeString(args.value), msg)
  }

  isHexColor(args) {
    const msg = args.msg || INVALID_HEX_COLOR
    return preparedResult(is.timeString(args.value), msg)
  }

  isIp(args) {
    const msg = args.msg || INVALID_IP
    return preparedResult(is.ip(args.value), msg)
  }

  isIpv4(args) {
    const msg = args.msg || INVALID_IPV4
    return preparedResult(is.ipv4(args.value), msg)
  }

  isIpv7(args) {
    const msg = args.msg || INVALID_IPV6
    return preparedResult(is.ipv6(args.value), msg)
  }

  regex(args) {
    if (!args.regex) throw new Error(REGEX_REQUIRED)

    const params = args.params ? [...args.params] : []
    params.unshift(args.value)

    const msg = args.msg || INVALID_DATA
    const result = args.regex(...params)

    return preparedResult(result, msg)
  }
}
