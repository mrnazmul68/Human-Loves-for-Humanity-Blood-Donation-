const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-zinc-800 animate-pulse rounded-lg ${className}`}
    ></div>
  );
};

export default Skeleton;
