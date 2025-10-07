export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: October 7, 2025</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Introduction</h2>
            <p className="text-gray-700">
              Festool Marketplace ("we", "our", or "us") is a web application that helps sellers create and share listings for Festool tools in Facebook groups. This Privacy Policy explains how we collect, use, and protect your information when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">Information from Facebook</h3>
            <p className="text-gray-700 mb-2">When you log in with Facebook, we receive:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Your name</li>
              <li>Your profile picture</li>
              <li>Your Facebook user ID</li>
              <li>Access token (used only during your session)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Listing details (product name, price, condition, description)</li>
              <li>Photos of tools you're selling</li>
              <li>Location (country and city)</li>
              <li>Languages you speak</li>
              <li>Shipping preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How We Use Your Information</h2>
            <p className="text-gray-700 mb-2">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Authenticate you via Facebook Login</li>
              <li>Display your name when logged in</li>
              <li>Enable you to create marketplace listings</li>
              <li>Save draft listings locally in your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How We Store Your Information</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-blue-900 font-semibold">
                All data is stored locally in your browser using localStorage. We do NOT store any data on servers.
              </p>
            </div>
            <p className="text-gray-700">
              When you post a listing to Facebook, the post is stored by Facebook according to their policies. You can delete these posts at any time through Facebook.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Sharing</h2>
            <p className="text-gray-700 mb-2">We do NOT:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Sell your data</li>
              <li>Share your data with third parties</li>
              <li>Use your data for advertising</li>
              <li>Track you across websites</li>
            </ul>
            <p className="text-gray-700">
              We ONLY share data with <strong>Facebook</strong> when you explicitly create or post a listing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Rights</h2>
            <p className="text-gray-700 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Access</strong> your data (it's all in your browser's localStorage)</li>
              <li><strong>Delete</strong> your data (clear browser data or use "Discard Draft" button)</li>
              <li><strong>Revoke permissions</strong> (disconnect the app in Facebook settings)</li>
              <li><strong>Export</strong> your data (copy and save your listings)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Security</h2>
            <p className="text-gray-700">We protect your data by:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Using HTTPS for all connections</li>
              <li>Storing data only in your browser (no server storage)</li>
              <li>Never storing access tokens permanently</li>
              <li>Using Facebook's secure OAuth authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Third-Party Services</h2>
            <p className="text-gray-700 mb-2">Our app integrates with:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Facebook</strong> - <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a></li>
              <li><strong>Vercel</strong> (Hosting) - <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy, please open an issue on our{' '}
              <a href="https://github.com/ppowstanski/festool-marketplace/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                GitHub repository
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Consent</h2>
            <p className="text-gray-700">
              By using Festool Marketplace, you consent to this Privacy Policy.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <a href="/" className="text-blue-600 hover:underline">← Back to App</a>
        </div>
      </div>
    </div>
  );
}
