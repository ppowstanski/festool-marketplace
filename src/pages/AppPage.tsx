import { Header } from '../components/Header';
import { ListingForm } from '../components/ListingForm/ListingForm';

export function AppPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-[#ededed] mb-2">
            Create Festool Listing
          </h1>
          <p className="text-[#a3a3a3]">
            Fill out the form below to create a professional marketplace listing for your Festool tool.
          </p>
        </div>
        <ListingForm />
      </main>
    </div>
  );
}
