import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="text-8xl font-black text-[#1e4d3b] opacity-20">404</p>
      <h1 className="text-3xl font-bold text-gray-800 mt-4">Page not found</h1>
      <p className="text-gray-500 mt-2 max-w-sm text-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 bg-[#1e4d3b] hover:bg-[#163828] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
