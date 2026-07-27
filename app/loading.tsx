export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center font-mono selection:bg-zinc-800">
      <div className="flex flex-col items-center gap-4 max-w-xs px-6 py-8 border border-zinc-800 bg-zinc-950/80 backdrop-blur-md rounded-none shadow-2xl text-center">
        {/* Y2K Spinning Indicator */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-zinc-800 rounded-full" />
          <div className="absolute inset-0 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Text Details */}
        <div className="space-y-1 mt-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            INITIALIZING
          </p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
            KUWINA // PORTFOLIO
          </p>
        </div>

        {/* Shimmer Bar */}
        <div className="w-full bg-zinc-900 h-1 relative overflow-hidden border border-zinc-800 mt-2">
          <div className="bg-white h-full w-1/3 animate-[shimmer_1.5s_infinite_linear] bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </div>
    </div>
  );
}
