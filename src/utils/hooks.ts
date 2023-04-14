import { useEffect, useState } from 'react'

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
