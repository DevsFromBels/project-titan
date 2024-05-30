import React from 'react'
import { Skeleton } from '../../ui/skeleton'

const ProfileMarketSkeleton = () => {
  return (
    <div className="w-[98%] max-w-[98%] m-auto my-1 p-4 bg-background border rounded-xl pb-16">
      <div className="mb-2">
        <h1 className="text-lg">Товары на рынке</h1>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <Skeleton className='max-w-[250px] h-[200px]'/>
        <Skeleton className='max-w-[250px] h-[200px]'/>
        <Skeleton className='max-w-[250px] h-[200px]'/>
        <Skeleton className='max-w-[250px] h-[200px]'/>
      </div>
    </div>
  )
}

export default ProfileMarketSkeleton