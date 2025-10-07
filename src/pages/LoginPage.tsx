import { useState } from 'react';
import { useFacebookAuth } from '../hooks/useFacebookAuth';

export function LoginPage() {
  const { login, error } = useFacebookAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await login();
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0a0a0a]">
      {/* Left Panel - Branding */}
      <div className="lg:w-1/2 bg-[#39b54a]/10 p-6 lg:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#39b54a]/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#39b54a] rounded-lg flex items-center justify-center relative overflow-hidden">
              <svg className="absolute bottom-[-6px] right-[-6px] w-full h-full text-[#050a04] opacity-60" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20 10h60v20H40v15h30v20H40v25H20V10z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-[#ededed]">FESTOOL Second Hand EU</h1>
              <p className="text-sm text-[#a3a3a3]">✅ Verified Marketplace</p>
            </div>
          </div>

          <div className="space-y-6 max-w-2xl">
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight text-[#ededed]">
              Your trusted marketplace for premium tools
            </h2>
            <p className="text-xl lg:text-2xl text-[#a3a3a3] leading-relaxed">
              Connect with the European Festool community. Buy and sell verified second-hand tools with confidence.
            </p>
          </div>
        </div>

        {/* Festool Product Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] pointer-events-none">
          <img
            src="/images/festool-portfolio.webp"
            alt="Festool Tools"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 max-w-md relative z-10">
          <div className="space-y-1">
            <div className="text-3xl font-bold text-[#39b54a]">2.5K+</div>
            <div className="text-sm text-[#a3a3a3]">Active Members</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-[#39b54a]">500+</div>
            <div className="text-sm text-[#a3a3a3]">Tools Listed</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-[#39b54a]">98%</div>
            <div className="text-sm text-[#a3a3a3]">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#ededed]">Welcome back</h2>
            <p className="text-[#a3a3a3]">
              Sign in with Facebook to access{' '}
              <span className="text-[#39b54a] font-semibold">FESTOOL Second Hand EU ✅ Verified Marketplace</span>
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full bg-[#39b54a] hover:bg-[#39b54a]/90 disabled:bg-[#39b54a]/50 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3 shadow-lg shadow-[#39b54a]/20"
            >
              {isLoggingIn ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                <p className="font-semibold">Login Error</p>
                <p>{error}</p>
              </div>
            )}

            <p className="text-xs text-center text-[#a3a3a3] px-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>

          <div className="pt-6 border-t border-[#262626]">
            <p className="text-sm text-[#a3a3a3] text-center">
              This is an exclusive marketplace for verified Facebook group members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
