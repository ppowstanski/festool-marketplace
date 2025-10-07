import { Header } from '../components/Header';

export function AppPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Create Festool Listing
          </h2>
          <p className="text-gray-600">
            Post creation form will be implemented in the next phase.
          </p>
        </div>
      </main>
    </div>
  );
}
