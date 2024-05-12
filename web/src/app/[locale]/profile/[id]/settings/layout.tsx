import ApolloProviderClient from '@/shared/Providers/ApolloProvider'
import React from 'react'

const SettingsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <ApolloProviderClient>{children}</ApolloProviderClient>
  )
}

export default SettingsLayout