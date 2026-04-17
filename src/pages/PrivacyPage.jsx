export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-green text-gray-600">
          <p className="mb-4">Last updated: April 2026</p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Information We Collect</h2>
          <p className="mb-4">
            KeenKeeper ("we", "our", or "us") respects your privacy. All of your friend connection data and interaction logs are stored safely. Currently, KeenKeeper stores your data using local state and files as configured in the application.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. How We Use Your Information</h2>
          <p className="mb-4">
            The data you provide is solely used to help you track your interactions with friends, set goals, and generate analytics for your personal use. We do not sell, rent, or share your personal data with third parties.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Data Security</h2>
          <p className="mb-4">
            We implement reasonably secure measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about our Privacy Policy, please reach out to us at privacy@keenkeeper.demo.
          </p>
        </div>
      </div>
    </div>
  );
}
