import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  Code2,
  FolderGit2,
  Award,
  FileText,
  Globe,
  Share2,
  ExternalLink,
  Plus,
  ArrowUpRight,
  CheckCircle,
  Copy,
  Check,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

export const DashboardPage = () => {
  const { user, updateUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/dashboard/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error('Error fetching dashboard stats', err);
      setError('Failed to load dashboard statistics. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleTogglePublish = async () => {
    if (!stats) return;
    const nextStatus = !stats.isPublished;
    try {
      setPublishing(true);
      const res = await api.put('/api/portfolio/publish', { published: nextStatus });
      setStats((prev) => ({ ...prev, isPublished: res.data.data }));
      updateUser({ isPublished: res.data.data });
    } catch (err) {
      console.error('Error updating publish status', err);
      alert('Failed to update publish status.');
    } finally {
      setPublishing(false);
    }
  };

  const handleCopyUrl = () => {
    const fullUrl = `${window.location.origin}/u/${stats?.username || user?.username}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard metrics..." size="lg" />;
  }

  const completionScore = stats?.profileCompletionPercentage || 0;
  const publicPath = `/u/${stats?.username || user?.username}`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome & Completion Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/20">
              <TrendingUp className="w-3.5 h-3.5" />
              Developer Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {user?.fullName || user?.username}!
            </h1>
            <p className="text-sm text-indigo-200/80 max-w-xl">
              Keep your profile, technical skills, and projects up-to-date to stand out to recruiters and peers.
            </p>
          </div>

          {/* Profile Completion Meter */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-100 uppercase tracking-wider">
                Profile Completion
              </span>
              <span className="text-sm font-bold text-white">{completionScore}%</span>
            </div>

            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  completionScore >= 80 ? 'bg-emerald-400' : completionScore >= 50 ? 'bg-amber-400' : 'bg-rose-400'
                }`}
                style={{ width: `${completionScore}%` }}
              />
            </div>

            <p className="text-[11px] text-indigo-200 mt-2">
              {completionScore < 100
                ? 'Tip: Add your skills, projects, and resume to reach 100% completion!'
                : 'All sections completed! Your portfolio is looking great.'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Public Portfolio Control Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${stats?.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Public Portfolio Link</h3>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  stats?.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {stats?.isPublished ? 'Live & Published' : 'Private Draft'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              {window.location.origin}{publicPath}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied URL!' : 'Copy Link'}
          </button>

          <Link
            to="/preview"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <span>Preview</span>
          </Link>

          {stats?.isPublished && (
            <a
              href={publicPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={publishing}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-xl transition shadow-sm ${
              stats?.isPublished
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {publishing ? 'Updating...' : stats?.isPublished ? 'Unpublish' : 'Publish Portfolio'}
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          to="/projects"
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-indigo-300 hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Projects</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats?.totalProjects ?? 0}</p>
          <p className="text-xs text-indigo-600 mt-2 font-medium flex items-center gap-1">
            Manage projects <ArrowUpRight className="w-3 h-3" />
          </p>
        </Link>

        <Link
          to="/skills"
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-indigo-300 hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Skills</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition">
              <Code2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats?.totalSkills ?? 0}</p>
          <p className="text-xs text-indigo-600 mt-2 font-medium flex items-center gap-1">
            Manage skills <ArrowUpRight className="w-3 h-3" />
          </p>
        </Link>

        <Link
          to="/certifications"
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-indigo-300 hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certifications</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats?.totalCertifications ?? 0}</p>
          <p className="text-xs text-indigo-600 mt-2 font-medium flex items-center gap-1">
            Manage certs <ArrowUpRight className="w-3 h-3" />
          </p>
        </Link>

        <Link
          to="/resume"
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-indigo-300 hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resume</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">
            {stats?.hasResume ? 'Uploaded (PDF)' : 'Not Uploaded'}
          </p>
          <p className="text-xs text-indigo-600 mt-3 font-medium flex items-center gap-1">
            {stats?.hasResume ? 'Replace or download' : 'Upload resume now'}{' '}
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </Link>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Project
          </Link>
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </Link>
          <Link
            to="/certifications"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Plus className="w-4 h-4" /> Add Certification
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <FileText className="w-4 h-4" /> Manage Resume
          </Link>
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Skills Matrix Breakdown & Recent Projects Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Skills by Category</h3>
            <Link to="/skills" className="text-xs text-indigo-600 font-semibold hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3.5 pt-2">
            {stats?.skillsByCategory &&
              Object.entries(stats.skillsByCategory).map(([cat, count]) => {
                const total = stats.totalSkills || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-700">{cat}</span>
                      <span className="text-slate-400 font-mono">{count} skills</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Recent Projects List */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Projects</h3>
            <Link to="/projects" className="text-xs text-indigo-600 font-semibold hover:underline">
              Manage all ({stats?.totalProjects ?? 0})
            </Link>
          </div>

          {stats?.recentProjects && stats.recentProjects.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {stats.recentProjects.map((p) => (
                <div key={p.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-800">{p.title}</h4>
                      {p.featured && (
                        <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.description || 'No description provided.'}</p>
                    {p.technologies && (
                      <p className="text-[11px] text-indigo-600 font-medium mt-1">
                        Tech: {p.technologies}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs flex-shrink-0">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                        title="GitHub"
                      >
                        <FolderGit2 className="w-4 h-4" />
                      </a>
                    )}
                    {p.liveDemoUrl && (
                      <a
                        href={p.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              No projects added yet.{' '}
              <Link to="/projects" className="text-indigo-600 font-semibold hover:underline">
                Add your first project
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

