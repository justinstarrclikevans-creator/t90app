import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center px-6 py-12">
      {/* Logo / Brand */}
      <div className="text-center mb-12">
        <div className="text-7xl mb-4">🔄</div>
        <h1 className="text-5xl font-bold text-white mb-3">Turn90</h1>
        <p className="text-blue-100 text-xl max-w-md">
          Your path to a new life. Training, support, and resources — all in one place.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="w-full max-w-sm space-y-4">
        <Link
          href="/login"
          className="block w-full bg-white text-blue-700 text-center text-xl font-semibold py-5 px-8 rounded-2xl shadow-lg hover:bg-blue-50 active:scale-[0.98] transition-all"
        >
          Get Started
        </Link>
        <Link
          href="/dashboard"
          className="block w-full bg-blue-500 bg-opacity-30 text-white text-center text-lg font-medium py-4 px-8 rounded-2xl border-2 border-blue-300 border-opacity-50 hover:bg-opacity-40 active:scale-[0.98] transition-all"
        >
          Continue Where I Left Off
        </Link>
      </div>

      {/* Footer */}
      <p className="text-blue-200 text-sm mt-12 text-center">
        Need help? Tap the chat button on any page.
      </p>
    </div>
  );
}
