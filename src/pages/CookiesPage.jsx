export default function CookiesPage() {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
        <div className="prose prose-green text-gray-600">
          <p className="mb-4">Last updated: April 2026</p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. What Are Cookies?</h2>
          <p className="mb-4">
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work or work more efficiently, as well as to provide information to the owners of the site.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. How We Use Cookies</h2>
          <p className="mb-4">
            KeenKeeper may use cookies (or similar technologies like local storage) to enhance your experience. Specifically, we might use local storage to persist your state securely within your browser so you don't lose data on reload.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Managing Consents</h2>
          <p className="mb-4">
            You can control and/or delete cookies through your browser settings. You can delete all cookies that are already on your computer, and you can set most browsers to prevent them from being placed. However, doing so may impact the functionality of our application.
          </p>
        </div>
      </div>
    </div>
  );
}
