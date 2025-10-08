import { Header } from '../components/Header';
import { ListingForm } from '../components/ListingForm/ListingForm';
import { useTranslation } from '../hooks/useTranslation';

export function AppPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="px-6 py-8">
        {/* Main Content Area */}
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#ededed] mb-2">
              {t('dashboard.createListing')}
            </h2>
            <p className="text-[#a3a3a3]">
              {t('dashboard.subtitle')}
            </p>
          </div>
          <ListingForm />
        </div>
      </main>
    </div>
  );
}
