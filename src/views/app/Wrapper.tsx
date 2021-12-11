import React from 'react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'requests'

const Wrapper: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Wrapper
