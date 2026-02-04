import { useState, useMemo, type ChangeEvent } from 'react'

interface UseFormProps<T> {
  initialValue: T
  validate: (values: T) => Partial<Record<keyof T, string>>
}

function useForm<T extends Record<string, unknown>>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue)
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const handleChange = (name: keyof T, text: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: text,
    }))
  }

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const getInputProps = (name: keyof T) => {
    const value = values[name]
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value)
    const onBlur = () => handleBlur(name)

    return { value, onChange, onBlur }
  }

  // errors를 useMemo로 계산 → Effect 안 setState 사용 X
  const errors = useMemo(() => validate(values), [values, validate])

  return { values, errors, touched, getInputProps }
}

export default useForm
