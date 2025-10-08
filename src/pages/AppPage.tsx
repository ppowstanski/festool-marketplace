import { Header } from '../components/Header';
import { ListingForm } from '../components/ListingForm/ListingForm';
import { useTranslation } from '../hooks/useTranslation';

export function AppPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="px-4 py-4">
        <div className="max-w-full mx-auto">
          <ListingForm />
        </div>
      </main>
    </div>
  );
}
