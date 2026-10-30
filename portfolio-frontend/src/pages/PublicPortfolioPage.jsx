import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import TemplateRenderer from '../templates/TemplateRenderer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Lock, ArrowLeft, Sparkles } from 'lucide-react';

export const PublicPortfolioPage = () => {
  const { username, slug } = useParams();
  const effectiveIdentifier = slug || username;

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPrivateOrNotFound, setIsPrivateOrNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchPublicPortfolio = async () => {
      try {
        setLoading(true);
        setIsPrivateOrNotFound(false);
        const res = await axios.get(`${apiBaseUrl}/api/public/${effectiveIdentifier}`);
        setPortfolio(res.data?.data || null);
      } catch (err) {
        console.error('Error fetching public portfolio', err);
        setIsPrivateOrNotFound(true);
        setErrorMessage(
          err.response?.data?.message || 'This portfolio is private or does not exist.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (effectiveIdentifier) {
      fetchPublicPortfolio();
    }
  }, [effectiveIdentifier, apiBaseUrl]);

  const handleDownloadResume = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/public/${effectiveIdentifier}/resume`, {
        responseType: 'blob',
      });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', `${effectiveIdentifier}_resume.pdf`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Resume file is not available for download.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <LoadingSpinner text={`Generating @${effectiveIdentifier}'s portfolio...`} size="lg" />
      </div>
    );
  }

  if (isPrivateOrNotFound || !portfolio) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-6 shadow-2xl">
          <Lock className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Portfolio is Currently Private</h1>
        <p className="mt-3 text-sm text-slate-400 max-w-md leading-relaxed">
          {errorMessage || `The portfolio for @${effectiveIdentifier} is unpublished or does not exist.`}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolify
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
          >
            Create Your Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Floating Portfolify Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-[11px] font-semibold border border-slate-700 backdrop-blur-md shadow-2xl hover:scale-105 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Built with Portfolify</span>
        </Link>
      </div>

      <TemplateRenderer
        portfolio={portfolio}
        templateId={portfolio.templateId || portfolio.profile?.templateId || 'minimal-pro'}
        themeColor={portfolio.themeColor || portfolio.profile?.themeColor || 'indigo'}
        fontFamily={portfolio.fontFamily || portfolio.profile?.fontFamily || 'sans'}
        onDownloadResume={handleDownloadResume}
      />
    </div>
  );
};

export default PublicPortfolioPage;
