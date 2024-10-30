export default function UserSkeleton() {
  return (
    <div className="flex justify-between mb-4 animate-pulse">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 mr-2"></div>
        <div className="flex flex-col justify-center">
          <div className="h-4 w-24 bg-slate-200 rounded mb-1"></div>
          <div className="h-4 w-16 bg-slate-200 rounded"></div>
        </div>
      </div>
      <div className="h-8 w-24 bg-slate-200 rounded"></div>
    </div>
  );
}
