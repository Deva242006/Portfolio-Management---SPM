import React, { useState, useCallback } from 'react';
import { X, Sparkles, RefreshCw, Copy, Check, ChevronDown } from 'lucide-react';
import { generateAboutMe, generateProjectDescription, generateHeadlines } from '../../api/aiApi';

// ─── Constants ──────────────────────────────────────────────────────────────

const TONES = ['Professional', 'Friendly', 'Confident', 'Creative', 'Concise'];
const MODES = [
  { value: 'detailed',          label: 'Detailed' },
  { value: 'short',             label: 'Short' },
  { value: 'resume-friendly',   label: 'Resume-Friendly' },
  { value: 'recruiter-focused', label: 'Recruiter-Focused' },
];
const EXPERIENCE_LEVELS = ['Student', 'Entry-level', 'Mid-level', 'Senior', 'Lead'];

// ─── Helper: API Key Missing Check ──────────────────────────────────────────

const isApiKeyError = (msg) =>
  typeof msg === 'string' && msg.startsWith('AI_KEY_NOT_CONFIGURED');

// ─── Sub-component: AI Key Missing Banner ───────────────────────────────────

const ApiKeyMissingBanner = () => (
  <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 mt-4">
    <div className="flex items-start gap-3">
      <span className="text-yellow-500 text-xl mt-0.5">⚠️</span>
      <div>
        <p className="font-semibold text-yellow-800 text-sm">AI Generation Not Configured</p>
        <p className="text-yellow-700 text-sm mt-1">
          The <code className="bg-yellow-100 rounded px-1">GEMINI_API_KEY</code> environment variable is not set on the backend server.
        </p>
        <p className="text-yellow-700 text-sm mt-2">
          To enable AI features, set the environment variable and restart the backend:
        </p>
        <pre className="bg-yellow-100 rounded-lg p-2 mt-2 text-xs text-yellow-800 overflow-x-auto">
{`# Windows PowerShell
$env:GEMINI_API_KEY = "your-api-key-here"
mvn spring-boot:run

# Or set permanently in System Environment Variables`}
        </pre>
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs text-indigo-600 hover:underline"
        >
          Get a free Gemini API key →
        </a>
      </div>
    </div>
  </div>
);

// ─── About Me Panel ─────────────────────────────────────────────────────────

const AboutMePanel = ({ contextData, onApply, onClose }) => {
  const [tone, setTone] = useState('Professional');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editableContent, setEditableContent] = useState('');

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setError(null);
    setApiKeyMissing(false);
    setResult(null);
    try {
      const payload = {
        fullName: contextData?.fullName || '',
        role: contextData?.headline || contextData?.role || '',
        education: contextData?.education || '',
        skills: contextData?.skills || '',
        projects: contextData?.projects || '',
        experience: contextData?.experience || '',
        interests: contextData?.interests || '',
        tone,
      };
      const res = await generateAboutMe(payload);
      if (res.data.success) {
        setResult(res.data.content);
        setEditableContent(res.data.content);
      } else {
        const msg = res.data.errorMessage || 'Generation failed.';
        if (isApiKeyError(msg)) {
          setApiKeyMissing(true);
        } else {
          setError(msg);
        }
      }
    } catch (err) {
      setError('Failed to reach AI service. Please check your connection.');
    } finally {
      setGenerating(false);
    }
  }, [contextData, tone]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Tone Selector */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Writing Tone</label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                tone === t
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Context Preview */}
      {contextData && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-500 space-y-1">
          <p className="font-medium text-slate-700 mb-1">Using your information:</p>
          {contextData.fullName && <p>👤 <strong>Name:</strong> {contextData.fullName}</p>}
          {contextData.headline && <p>💼 <strong>Role:</strong> {contextData.headline}</p>}
          {contextData.skills    && <p>🛠️ <strong>Skills:</strong> {contextData.skills}</p>}
          {contextData.projects  && <p>📁 <strong>Projects:</strong> {contextData.projects}</p>}
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg"
      >
        {generating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            {result ? 'Regenerate' : 'Generate with AI'}
          </>
        )}
      </button>

      {/* API Key Missing Banner */}
      {apiKeyMissing && <ApiKeyMissingBanner />}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Generated Result */}
      {result && !apiKeyMissing && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Generated Content <span className="text-slate-400 font-normal">(you can edit below)</span>
          </label>
          <textarea
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            rows={6}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={() => { onApply(editableContent); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all"
            >
              <Check className="w-4 h-4" />
              Apply to Portfolio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Headlines Panel ─────────────────────────────────────────────────────────

const HeadlinesPanel = ({ contextData, onApply, onClose }) => {
  const [generating, setGenerating] = useState(false);
  const [alternatives, setAlternatives] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setError(null);
    setApiKeyMissing(false);
    setAlternatives([]);
    setSelected(null);
    try {
      const payload = {
        fullName: contextData?.fullName || '',
        careerGoal: contextData?.headline || contextData?.role || '',
        skills: contextData?.skills || '',
        experienceLevel: contextData?.experienceLevel || 'Entry-level',
      };
      const res = await generateHeadlines(payload);
      if (res.data.success) {
        setAlternatives(res.data.alternatives || [res.data.content]);
      } else {
        const msg = res.data.errorMessage || 'Generation failed.';
        if (isApiKeyError(msg)) setApiKeyMissing(true);
        else setError(msg);
      }
    } catch (err) {
      setError('Failed to reach AI service.');
    } finally {
      setGenerating(false);
    }
  }, [contextData]);

  return (
    <div className="space-y-5">
      {contextData && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-500 space-y-1">
          <p className="font-medium text-slate-700 mb-1">Using your information:</p>
          {contextData.fullName && <p>👤 <strong>Name:</strong> {contextData.fullName}</p>}
          {contextData.skills    && <p>🛠️ <strong>Skills:</strong> {contextData.skills}</p>}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg"
      >
        {generating ? (
          <><RefreshCw className="w-4 h-4 animate-spin" />Generating...</>
        ) : (
          <><Sparkles className="w-4 h-4" />{alternatives.length ? 'Regenerate' : 'Generate Headlines'}</>
        )}
      </button>

      {apiKeyMissing && <ApiKeyMissingBanner />}
      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      {alternatives.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Select a headline:</p>
          {alternatives.map((alt, i) => (
            <button
              key={i}
              onClick={() => setSelected(alt)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                selected === alt
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
              }`}
            >
              <span className="text-slate-400 text-xs mr-2">#{i + 1}</span>
              {alt}
            </button>
          ))}
          {selected && (
            <button
              onClick={() => { onApply(selected); onClose(); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all"
            >
              <Check className="w-4 h-4" />
              Apply Headline
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Project Description Panel ───────────────────────────────────────────────

const ProjectDescPanel = ({ contextData, onApply, onClose }) => {
  const [mode, setMode] = useState('detailed');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editableContent, setEditableContent] = useState('');

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setError(null);
    setApiKeyMissing(false);
    setResult(null);
    try {
      const payload = {
        title: contextData?.title || '',
        purpose: contextData?.purpose || '',
        technologies: contextData?.technologies || '',
        features: contextData?.features || '',
        problemsSolved: contextData?.problemsSolved || '',
        githubUrl: contextData?.githubUrl || '',
        liveDemoUrl: contextData?.liveDemoUrl || '',
        mode,
      };
      const res = await generateProjectDescription(payload);
      if (res.data.success) {
        setResult(res.data.content);
        setEditableContent(res.data.content);
      } else {
        const msg = res.data.errorMessage || 'Generation failed.';
        if (isApiKeyError(msg)) setApiKeyMissing(true);
        else setError(msg);
      }
    } catch (err) {
      setError('Failed to reach AI service.');
    } finally {
      setGenerating(false);
    }
  }, [contextData, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Mode Selector */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Description Style</label>
        <div className="grid grid-cols-2 gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                mode === m.value
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Context Preview */}
      {contextData?.title && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-500 space-y-1">
          <p className="font-medium text-slate-700 mb-1">Project context:</p>
          <p>📁 <strong>Title:</strong> {contextData.title}</p>
          {contextData.technologies && <p>🛠️ <strong>Tech:</strong> {contextData.technologies}</p>}
          {contextData.features && <p>✅ <strong>Features:</strong> {contextData.features}</p>}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg"
      >
        {generating ? (
          <><RefreshCw className="w-4 h-4 animate-spin" />Generating...</>
        ) : (
          <><Sparkles className="w-4 h-4" />{result ? 'Regenerate' : 'Generate Description'}</>
        )}
      </button>

      {apiKeyMissing && <ApiKeyMissingBanner />}
      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      {result && !apiKeyMissing && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Generated Description <span className="text-slate-400 font-normal">(editable)</span>
          </label>
          <textarea
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={() => { onApply(editableContent); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all"
            >
              <Check className="w-4 h-4" />
              Apply to Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main AIGeneratorPanel Component ─────────────────────────────────────────

/**
 * AIGeneratorPanel
 *
 * Props:
 *  - type: 'about' | 'headline' | 'project'
 *  - contextData: object with pre-filled fields
 *  - onApply(text): callback when user clicks Apply
 *  - onClose(): callback to close the panel
 *  - title: optional custom title
 */
const AIGeneratorPanel = ({ type, contextData, onApply, onClose, title }) => {
  const panelTitles = {
    about:    '✨ Generate About Me',
    headline: '✨ Generate Headline',
    project:  '✨ Generate Project Description',
  };

  const panelSubtitles = {
    about:    'AI will write a professional bio based on your information.',
    headline: 'AI will suggest 3 professional headline options for you to choose from.',
    project:  'AI will write a project description based on what you\'ve provided.',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-violet-50">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {title || panelTitles[type] || '✨ AI Generator'}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {panelSubtitles[type] || 'Generate professional content with AI.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* AI Disclaimer */}
          <p className="mt-3 text-xs text-slate-400 bg-white/60 rounded-lg px-3 py-2">
            🛡️ AI uses only the information you provide. Generated content is a suggestion — review before applying.
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {type === 'about'    && <AboutMePanel    contextData={contextData} onApply={onApply} onClose={onClose} />}
          {type === 'headline' && <HeadlinesPanel  contextData={contextData} onApply={onApply} onClose={onClose} />}
          {type === 'project'  && <ProjectDescPanel contextData={contextData} onApply={onApply} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

export default AIGeneratorPanel;

