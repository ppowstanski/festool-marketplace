export default function DataDeletion() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Data Deletion</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Data We Store</h2>
          <p className="text-gray-700 mb-4">
            Festool Marketplace is a client-side application that stores data locally in your browser.
            We do <strong>not</strong> store any user data on our servers.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Draft Posts:</strong> Stored in your browser's localStorage to allow you to save
              and resume listing creation. This data never leaves your device.
            </li>
            <li>
              <strong>Facebook Access Token:</strong> Temporary authentication token stored in your
              browser's sessionStorage. This is automatically cleared when you log out or close your browser.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Delete Your Data</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Clear Local Data</h3>
            <p className="text-blue-800 mb-2">
              Since all data is stored locally in your browser, you can delete it by:
            </p>
            <ol className="list-decimal list-inside text-blue-800 space-y-1 ml-4">
              <li>Opening your browser's settings</li>
              <li>Finding "Clear browsing data" or "Privacy settings"</li>
              <li>Selecting "Cookies and site data" and "Cached images and files"</li>
              <li>Choosing "festool-marketplace.com" (or this site's domain)</li>
              <li>Clicking "Clear data"</li>
            </ol>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Remove Facebook App Connection</h3>
            <p className="text-green-800 mb-2">
              To revoke this app's access to your Facebook account:
            </p>
            <ol className="list-decimal list-inside text-green-800 space-y-1 ml-4">
              <li>Go to Facebook Settings → Apps and Websites</li>
              <li>Find "Festool Marketplace" in your apps list</li>
              <li>Click "Remove" to revoke access</li>
            </ol>
            <p className="text-green-800 mt-2">
              Or visit:{' '}
              <a
                href="https://www.facebook.com/settings?tab=applications"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline hover:text-green-700"
              >
                Facebook Apps Settings
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Deletion Requests</h2>
          <p className="text-gray-700 mb-4">
            If you have deleted your Facebook account or removed our app, your data is automatically
            removed from our application since we don't store any data server-side.
          </p>
          <p className="text-gray-700 mb-4">
            If you have any concerns or questions about your data, please contact us at:
          </p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-gray-800 font-semibold">Email: privacy@festool-marketplace.com</p>
            <p className="text-gray-600 text-sm mt-2">
              We will respond to your request within 30 days.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Privacy Rights</h2>
          <p className="text-gray-700 mb-4">
            Under data protection laws (including GDPR and CCPA), you have the following rights:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to delete your data (right to be forgotten)</li>
            <li>Right to restrict processing of your data</li>
            <li>Right to data portability</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Since we don't store any data server-side, most of these rights are automatically satisfied
            by the local-only storage model of our application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions?</h2>
          <p className="text-gray-700">
            If you have any questions about data deletion or our privacy practices, please don't
            hesitate to reach out to us at{' '}
            <a href="mailto:privacy@festool-marketplace.com" className="text-blue-600 underline hover:text-blue-700">
              privacy@festool-marketplace.com
            </a>
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}
