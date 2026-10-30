import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { TEMPLATES, SAMPLE_PORTFOLIO } from '../templates/templatesData';
import TemplateRenderer from '../templates/TemplateRenderer';
import Modal from '../components/common/Modal';
import {
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  CheckCircle2,
  Layers,
  Palette,
  ExternalLink,
} from 'lucide-react';

export const TemplatesPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTemplateId, setSelectedTemplateId] = useState('minimal-pro');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [saving, setSaving] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/api/portfolio/preview').then((res) => {
        if (res.data?.data) {
          setUserPortfolio(res.data.data);
          if (res.data.data.templateId) {
            setSelectedTemplateId(res.data.data.templateId);
          }
        }
      }).catch((e) => console.error(e));
    }
  }, [isAuthenticated]);

  const categories = ['All', 'Minimal', 'Developer', 'Creative', 'Student', 'Executive', 'Modern'];

  const filteredTemplates =
    activeFilter === 'All'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category.toLowerCase() === activeFilter.toLowerCase());

  const handleUseTemplate = async (templateId) => {
    if (!isAuthenticated) {
      navigate('/register', { state: { chosenTemplate: templateId } });
      return;
    }

    setSaving(true);
    try {
      await api.put('/api/profile', {
        templateId,
      });
      setSelectedTemplateId(templateId);
      navigate('/builder');
    } catch (err) {
      console.error('Error setting template', err);
      navigate('/builder');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Layers className="w-3.5 h-3.5" />
          <span>10 Distinct Architecture Layouts</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Choose Your Portfolio Template
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Every template is custom-crafted with a distinct visual hierarchy, content structure, and responsive layout. Switch templates anytime with zero code.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeFilter === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((t) => {
          const isSelected = selectedTemplateId === t.id;
          return (
            <div
              key={t.id}
              className={`rounded-3xl border-2 overflow-hidden bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-xl group ${
                isSelected
                  ? 'border-indigo-600 ring-4 ring-indigo-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Template Card Top Preview Header */}
              <div
                className="h-44 p-6 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background:
                    t.id === 'modern-dev'
                      ? 'linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)'
                      : t.id === 'creative-designer'
                      ? 'linear-gradient(135deg, #0e0e10 0%, #3b0764 100%)'
                      : t.id === 'executive'
                      ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                      : t.id === 'bento-grid'
                      ? 'linear-gradient(135deg, #090d16 0%, #2e1065 100%)'
                      : t.id === 'student'
                      ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
                      : t.id === 'terminal-hacker'
                      ? 'linear-gradient(135deg, #022c22 0%, #052e16 100%)'
                      : t.id === 'neo-brutalist'
                      ? 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)'
                      : t.id === 'editorial-magazine'
                      ? 'linear-gradient(135deg, #fdfbf7 0%, #f5f5f4 100%)'
                      : t.id === 'startup-founder'
                      ? 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)'
                      : 'linear-gradient(135deg, #fafafa 0%, #f1f5f9 100%)',
                }}
              >
                <div className="flex items-center justify-between z-10">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      t.id === 'minimal-pro' || t.id === 'student' || t.id === 'neo-brutalist' || t.id === 'editorial-magazine'
                        ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                        : 'bg-white/10 text-white backdrop-blur-md'
                    }`}
                  >
                    {t.badge || t.category}
                  </span>

                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-600 text-white shadow-sm">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  )}
                </div>

                <div className="z-10">
                  <span
                    className={`text-xs font-mono font-bold ${
                      t.id === 'minimal-pro' || t.id === 'student'
                        ? 'text-slate-500'
                        : 'text-slate-400'
                    }`}
                  >
                    TEMPLATE #{t.id.toUpperCase()}
                  </span>
                  <h3
                    className={`text-xl font-black ${
                      t.id === 'minimal-pro' || t.id === 'student'
                        ? 'text-slate-900'
                        : 'text-white'
                    }`}
                  >
                    {t.name}
                  </h3>
                </div>
              </div>

              {/* Template Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {t.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Key Highlights:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {t.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-slate-400 italic pt-1">
                    <span className="font-semibold text-slate-600 not-italic">Ideal for: </span>
                    {t.idealFor}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-slate-100 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(t)}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-slate-500" />
                    Live Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUseTemplate(t.id)}
                    disabled={saving}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex flex-col items-center p-2 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col my-auto max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: previewTemplate.accent }}
                />
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {previewTemplate.name} — Interactive Preview
                  </h3>
                  <p className="text-xs text-slate-400">
                    Showing template populated with sample portfolio data
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleUseTemplate(previewTemplate.id);
                    setPreviewTemplate(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition cursor-pointer"
                >
                  <span>Select & Build</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto">
              <TemplateRenderer
                portfolio={userPortfolio || SAMPLE_PORTFOLIO}
                templateId={previewTemplate.id}
                themeColor={previewTemplate.accent ? 'indigo' : 'emerald'}
                fontFamily="sans"
                onDownloadResume={() => alert('Resume download simulated in preview.')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;

