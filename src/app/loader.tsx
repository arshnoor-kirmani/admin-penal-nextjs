export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white/70">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-700 font-medium">Loading Dashboard...</p>
      </div>
    </div>
  );
}
