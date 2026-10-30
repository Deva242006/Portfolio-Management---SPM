import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TemplateRenderer from '../templates/TemplateRenderer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  Globe,
  ExternalLink,
  Eye,
  CheckCircle2,
  Sparkles,
  Layers,
  Palette,
  Edit,
} from 'lucide-react';

export const PreviewPage = () => {
  const { user, updateUser } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const fetchPreview = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/portfolio/preview');
      setPortfolio(res.data?.data || null);
    } catch (err) {
      console.error('Error fetching preview', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreview();
  }, []);

  const handleTogglePublish = async () => {
    if (!portfolio) return;
    const nextStatus = !portfolio.published;
    try {
      setPublishing(true);
      const res = await api.put('/api/portfolio/publish', { published: nextStatus });
      setPortfolio((prev) => ({ ...prev, published: res.data.data }));
      updateUser({ isPublished: res.data.data });
      setAlertMsg(
        res.data.data
          ? 'Portfolio published to the public web!'
          : 'Portfolio unpublished. It is now in private draft mode.'
      );
      setTimeout(() => setAlertMsg(''), 4000);
    } catch (err) {
      console.error('Error toggling publish status', err);
      alert('Failed to change publish status.');
    } finally {
      setPublishing(false);
    }
  };

  const handleDownloadResume = async () => {
    try {
      const res = await api.get('/api/resume/download', { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', `${portfolio?.username || 'user'}_resume.pdf`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Could not download resume.');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Generating portfolio preview..." size="lg" />;
  }

  const publicUrl = `/p/${portfolio?.username || user?.username}`;
  const templateId = portfolio?.templateId || portfolio?.profile?.templateId || 'minimal-pro';
  const themeColor = portfolio?.themeColor || portfolio?.profile?.themeColor || 'indigo';
  const fontFamily = portfolio?.fontFamily || portfolio?.profile?.fontFamily || 'sans';

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Control Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Live Preview & Architecture</h2>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  portfolio?.published
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {portfolio?.published ? 'Live & Published' : 'Draft Mode'}
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono">
                {templateId}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              {window.location.origin}{publicUrl}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/builder"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize in Builder</span>
          </Link>

          {portfolio?.published && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={publishing}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-xl transition shadow-sm ${
              portfolio?.published
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {publishing
              ? 'Updating...'
              : portfolio?.published
              ? 'Unpublish'
              : 'Publish to Web'}
          </button>
        </div>
      </div>

      {alertMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* Rendered Template View */}
      <div className="rounded-3xl overflow-hidden border border-slate-300 shadow-2xl">
        <TemplateRenderer
          portfolio={portfolio}
          templateId={templateId}
          themeColor={themeColor}
          fontFamily={fontFamily}
          onDownloadResume={handleDownloadResume}
        />
      </div>
    </div>
  );
};

export default PreviewPage;
