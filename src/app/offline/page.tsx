"use client";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="text-6xl mb-6">📡</div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        You&apos;re Offline
      </h1>
      <p className="text-xl text-slate-600 max-w-md mb-8">
        It looks like you lost your internet connection. Some features may not be
        available right now.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white text-lg font-semibold py-4 px-8 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all"
      >
        Try Again
      </button>
    </div>
  );
}
