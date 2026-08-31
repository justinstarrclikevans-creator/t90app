"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "verify">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a 10-digit phone number");
      return;
    }
    setLoading(true);
    setError("");

    // For demo purposes, skip actual SMS and go to verify step
    // In production, this would call Supabase Auth signInWithOtp
    await new Promise((r) => setTimeout(r, 1000));
    setStep("verify");
    setLoading(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    setLoading(true);
    setError("");

    // For demo purposes, accept any 6-digit code
    // In production, this would call Supabase Auth verifyOtp
    await new Promise((r) => setTimeout(r, 1000));

    // Save basic user info to localStorage for demo
    localStorage.setItem(
      "t90_user",
      JSON.stringify({
        phone: phone.replace(/\D/g, ""),
        role: "participant",
        name: "",
        loggedIn: true,
      })
    );

    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🔄</div>
        <h1 className="text-3xl font-bold text-white">Turn90</h1>
      </div>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8">
        {step === "phone" ? (
          <form onSubmit={handleSendCode}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Sign In
              </h2>
              <p className="text-slate-600 text-lg">
                Enter your phone number. We&apos;ll text you a code.
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(555) 555-5555"
                className="w-full text-xl py-4 px-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-center tracking-wider"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-500 text-center mb-4 font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white text-xl font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send Code <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-slate-500 text-sm text-center mt-4">
              For demo: enter any phone number, then use code 123456
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Enter Your Code
              </h2>
              <p className="text-slate-600 text-lg">
                We sent a 6-digit code to
                <br />
                <span className="font-semibold text-slate-800">{phone}</span>
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="code"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="123456"
                className="w-full text-3xl py-4 px-4 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-center tracking-[0.3em] font-mono"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-500 text-center mb-4 font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white text-xl font-semibold py-4 px-6 rounded-xl hover:bg-green-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Verify & Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setCode("");
                setError("");
              }}
              className="w-full text-slate-500 text-base font-medium mt-4 py-2 hover:text-slate-700 transition-colors"
            >
              ← Use a different number
            </button>
          </form>
        )}
      </div>

      <p className="text-blue-200 text-sm mt-8 text-center">
        Your information is private and secure.
      </p>
    </div>
  );
}
