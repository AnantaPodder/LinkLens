export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Link<span className="text-blue-600">Lens</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your long URLs into short, trackable links with powerful
            analytics
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Shorten Your URL
            </h2>
            <div className="flex gap-4">
              <input
                type="url"
                placeholder="Enter your long URL here..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Shorten
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">🔗</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                URL Shortening
              </h3>
              <p className="text-gray-600">
                Create short, memorable links from long URLs
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">📊</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Analytics
              </h3>
              <p className="text-gray-600">
                Track clicks, locations, and user behavior
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">🎯</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Custom Aliases
              </h3>
              <p className="text-gray-600">
                Create branded, custom short links
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
