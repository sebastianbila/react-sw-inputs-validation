export function useForm(inputs) {
  let isFormValid = true
  let fields = {}

  for (const input of inputs) {
    if (!input.status.isValid) {
      isFormValid = false
      break
    }
    isFormValid = input.status.isTouched && input.status.isValid
  }

  inputs.map((input) => {
    fields = {
      ...fields,
      [input.name]: input.value
    }
  })

  return {
    isFormValid,
    fields
  }
}
