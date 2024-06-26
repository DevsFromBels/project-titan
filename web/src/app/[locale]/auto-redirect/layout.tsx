import React from 'react'

const RedirectLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full'>{children}</div>
  )
}

export default RedirectLayout