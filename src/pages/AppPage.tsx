import { Header } from '../components/Header';
import { ListingForm } from '../components/ListingForm/ListingForm';
import { useTranslation } from '../hooks/useTranslation';

export function AppPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="px-6 py-4">
        <div className="max-w-[1600px] mx-auto">
          <ListingForm />
        </div>
      </main>
    </div>
  );
}
