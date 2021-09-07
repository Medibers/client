import { useEffect, useState } from 'react'

interface IEntity {
  _id: string
  name: string
}

interface ISelectOption {
  label: string
  value: string
}

export const mapEntitiesToSelectOptions = (
  entities: IEntity[]
): ISelectOption[] =>
  entities.map(({ _id, name }) => ({ label: name, value: _id }))

export const useDebounce = (str: string, delay = 300): string => {
  const [debouncedStr, setDebouncedStr] = useState(str)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedStr(str)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [delay, str])

  return debouncedStr
}
