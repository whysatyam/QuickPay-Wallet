export default function Balance({ value, loading }) {
  return (
    <div className="flex items-center">
      <div className="font-bold text-lg">Your Balance:</div>
      {loading ? (
        <div className="ml-4 w-20 h-6 bg-slate-200 rounded overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-shimmer opacity-80 rounded blur-sm"></div>
        </div>
      ) : (
        <div className="font-semibold ml-4 text-lg">${value}</div>
      )}
    </div>
  );
}
