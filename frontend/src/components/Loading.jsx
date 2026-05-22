const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-red-900/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-sky-200">MATOMA</h2>
          <p className="text-red-200">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
