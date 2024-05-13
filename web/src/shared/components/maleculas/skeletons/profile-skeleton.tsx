import { Skeleton } from "@/shared/components/ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="w-[100vw]">
    <div className="flex flex-col justify-center items-center h-[200px] gap-2">
      <Skeleton className="w-[100px] h-[100px] rounded-full"/>
      <Skeleton className="w-[100px] h-[16px]"/>
    </div>
    <div>
      <Skeleton className="w-[100px] h-[16px]"/>
      <Skeleton className="w-[100px] h-[16px]"/>
    </div>
  </div>
  )
}