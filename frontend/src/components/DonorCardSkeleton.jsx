import Skeleton from "./Skeleton";

const DonorCardSkeleton = () => {
  return (
    <div className="relative group min-w-[280px]">
      <div className="relative bg-zinc-900 backdrop-blur-lg border border-zinc-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4 mb-5">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-3 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default DonorCardSkeleton;
