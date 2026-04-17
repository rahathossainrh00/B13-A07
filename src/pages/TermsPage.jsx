export default function TermsPage() {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <div className="prose prose-green text-gray-600">
          <p className="mb-4">Last updated: April 2026</p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using KeenKeeper, you agree to be bound by these Terms of Service. If you do not agree to our terms, please do not use our service.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Description of Service</h2>
          <p className="mb-4">
            KeenKeeper is a Personal Relationship Management (PRM) tool designed to help you track interactions and maintain relationships with friends. It provides features like logging calls, texts, and videos, alongside interaction analytics.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. User Responsibilities</h2>
          <p className="mb-4">
            You agree to provide accurate, current, and complete information. You are responsible for all activities that occur under your session while using our application.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. Your continued use of the application after changes constitute your acceptance of the revised terms.
          </p>
        </div>
      </div>
    </div>
  );
}
