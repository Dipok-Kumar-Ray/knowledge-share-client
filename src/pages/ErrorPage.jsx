// import { Link, useRouteError } from 'react-router-dom';
// import { BookOpen, AlertTriangle } from 'lucide-react';

import { AlertTriangle, BookOpen } from "lucide-react";
import { Link, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-sky-100 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white p-10 shadow-2xl rounded-2xl text-center">
        <div className="flex justify-center mb-4 text-indigo-600">
          <AlertTriangle className="w-14 h-14" />
        </div>
        <h1 className="text-4xl font-bold text-indigo-800 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for.<br />
          <span className="text-sm text-gray-500 italic">
            {error?.statusText || error?.message || 'An unexpected error occurred.'}
          </span>
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition duration-200"
        >
          <BookOpen className="w-5 h-5" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
