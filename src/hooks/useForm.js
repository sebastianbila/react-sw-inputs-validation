export function useForm(inputs) {
  let isFormValid = true
  let fields = {}

  inputs.map((input) => {
    if (input.validation.shouldValidate) {
      isFormValid = input.validation.touched && input.validation.valid
    }
  })

  inputs.map((input) => {
    fields = {
      ...fields,
      [input.name]: input.value
    }
  })

  return {
    isFormValid, fields
  }
}
