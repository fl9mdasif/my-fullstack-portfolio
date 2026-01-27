import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for does not exist. It might have
            been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go Home
          </Link>
          <div>
            <Link
              href="/projects"
              className="inline-block ml-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              View Projects
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <div className="w-24 h-24 mx-auto mb-4">
            <svg
              className="w-full h-full text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.98-5.5-2.5m.5-4.5a7.963 7.963 0 015 2.5m-5-2.5V7a3 3 0 116 0v2.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
