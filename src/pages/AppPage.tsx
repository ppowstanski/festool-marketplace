import { Header } from '../components/Header';
import { ListingForm } from '../components/ListingForm/ListingForm';

export function AppPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto mb-6">
          <h1 className="text-4xl font-bold text-[#ededed] mb-2">
            Dashboard
          </h1>
        </div>

        {/* Main Content Area */}
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#ededed] mb-2">
              Create New Listing
            </h2>
            <p className="text-[#a3a3a3]">
              Fill out the form below to create a professional marketplace listing for your Festool tool.
            </p>
          </div>
          <ListingForm />
        </div>
      </main>
    </div>
  );
}
