import { useFacebookAuth } from '../hooks/useFacebookAuth';

export function Header() {
  const { user, logout } = useFacebookAuth();

  return (
    <header className="bg-[#0a0a0a] border-b border-[#262626] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#39b54a] rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-[#ededed]">
                Festool Marketplace
              </h1>
              <p className="text-xs text-[#a3a3a3]">Create Professional Listings</p>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.picture.data.url}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-[#262626]"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-[#ededed]">{user.name}</p>
                  <p className="text-xs text-[#a3a3a3]">Logged in</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#262626] rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
