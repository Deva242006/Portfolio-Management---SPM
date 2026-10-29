import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-rose-400 mb-6 shadow-xl">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-white">404</h1>
      <h2 className="mt-2 text-xl font-bold text-slate-200">Page Not Found</h2>
      <p className="mt-2 text-sm text-slate-400 max-w-sm">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
      >
        <Home className="w-4 h-4" /> Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

