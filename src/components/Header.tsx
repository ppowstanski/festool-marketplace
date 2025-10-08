import { useState } from 'react';
import { useFacebookAuth } from '../hooks/useFacebookAuth';
import { UserSettingsModal } from './UserSettingsModal';
import { useTranslation } from '../hooks/useTranslation';

export function Header() {
  const { user, logout } = useFacebookAuth();
  const [showSettings, setShowSettings] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="bg-[#39b54a]/10 border-b border-[#39b54a]/20 sticky top-0 z-40 shadow-lg backdrop-blur-sm">
      <div className="max-w-full mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#39b54a] rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg shadow-[#39b54a]/20">
              <svg className="absolute bottom-[-3px] right-[-3px] w-full h-full text-[#050a04] opacity-60" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20 10h60v20H40v15h30v20H40v25H20V10z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-[#ededed]">
                FESTOOL Second Hand EU
              </h1>
              <p className="text-xs text-[#39b54a]">✅ Verified Marketplace</p>
            </div>
          </div>

          {/* Right - User */}
          <div className="flex items-center gap-4">
            {/* <div className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 bg-[#0a0a0a] border border-[#39b54a]/20 text-[#ededed] placeholder-[#a3a3a3] px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54a] text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div> */}

            {user && (
              <>
                {/* <button className="relative p-2 text-[#a3a3a3] hover:text-[#39b54a] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button> */}

                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 text-[#a3a3a3] hover:text-[#39b54a] transition-colors"
                  title={t('header.settings')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>

                <div className="flex items-center gap-3">
                  <img
                    src={user.picture.data.url}
                    alt={user.name}
                    className="w-9 h-9 rounded-full border-2 border-[#39b54a]/30"
                  />
                </div>

                <button
                  onClick={logout}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-[#ededed] bg-[#39b54a]/10 hover:bg-[#39b54a]/20 border border-[#39b54a]/20 hover:border-[#39b54a]/40 rounded-lg transition-all duration-200"
                >
                  {t('header.logout')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <UserSettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </header>
  );
}
