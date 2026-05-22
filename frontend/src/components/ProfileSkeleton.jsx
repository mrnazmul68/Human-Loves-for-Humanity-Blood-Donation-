import Skeleton from "./Skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side - Profile Picture and Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <Skeleton className="h-16 w-full mb-4" />
              <div className="flex flex-col items-center">
                <Skeleton className="h-40 w-40 rounded-full mb-6" />
                <Skeleton className="h-8 w-40 mb-2" />
                <Skeleton className="h-5 w-32 mb-4" />
                <Skeleton className="h-12 w-40 mb-6" />
              </div>
              <div className="space-y-4 pt-6 border-t border-zinc-800">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <Skeleton className="h-7 w-40 mb-4" />
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-zinc-800 rounded-lg p-3 text-center">
                    <Skeleton className="h-8 w-10 mx-auto mb-1" />
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form Inputs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <Skeleton className="h-7 w-40 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <Skeleton className="h-7 w-52 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-14 w-full rounded-xl" />
                  </div>
                ))}
                <div className="md:col-span-2 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>
                <div className="md:col-span-2 pt-6 border-t border-zinc-800 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>
              </div>
              <div className="mt-8">
                <Skeleton className="h-14 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
