import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { CategoryBadge, LevelBadge } from '../components/common/Badge';
import {
  Globe,
  Download,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  ExternalLink,
  Award,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Eye,
  Star,
  Sparkles,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

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
          : 'Portfolio unpublished. It is now private.'
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

  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const certs = portfolio?.certifications || [];
  const publicUrl = `/u/${portfolio?.username || user?.username}`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Control Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Portfolio Live Preview</h2>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  portfolio?.published
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {portfolio?.published ? 'Published' : 'Draft Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              This preview matches exactly what visitors will see at your public URL.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {portfolio?.published && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              <span>Visit Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={publishing}
            className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white rounded-xl transition shadow-sm ${
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

      {/* Simulated Public Portfolio Container */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Hero Section */}
        <div className="relative p-8 sm:p-12 lg:p-16 border-b border-slate-800 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName || portfolio?.username}
                className="w-32 h-32 rounded-3xl object-cover border-4 border-indigo-500/30 shadow-2xl shadow-indigo-500/20"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                }}
              />
            ) : (
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-bold flex items-center justify-center text-5xl shadow-2xl shadow-indigo-600/30">
                {(profile.fullName || portfolio?.username || 'U').charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {profile.fullName || portfolio?.username}
                </h1>
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  @{portfolio?.username}
                </span>
              </div>

              <p className="text-lg text-indigo-300 font-medium">
                {profile.headline || 'Software Engineer & Full Stack Developer'}
              </p>

              {profile.location && (
                <p className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {profile.location}
                </p>
              )}

              {/* Action Buttons & Socials */}
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                {portfolio?.hasResume && (
                  <button
                    type="button"
                    onClick={handleDownloadResume}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/30"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </button>
                )}

                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}

                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}

                {profile.websiteUrl && (
                  <a
                    href={profile.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
                    title="Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}

                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-8 sm:p-12 space-y-12">
          {/* About Me & Education */}
          {(profile.bio || profile.education) && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {profile.bio && (
                <div className="lg:col-span-2 space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    About Me
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {profile.bio}
                  </p>
                </div>
              )}

              {profile.education && (
                <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    Education
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {profile.education}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Technical Skills Section */}
          {skills.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <div
                    key={s.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200"
                  >
                    <span className="font-semibold text-white">{s.name}</span>
                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      {s.proficiencyLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white">Featured & Recent Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-slate-800/50 rounded-2xl border border-slate-700/60 overflow-hidden flex flex-col justify-between hover:border-indigo-500/50 transition group"
                  >
                    <div>
                      {proj.imageUrl && (
                        <div className="h-40 overflow-hidden bg-slate-900">
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition">
                            {proj.title}
                          </h4>
                          {proj.featured && (
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>

                        {proj.technologies && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {proj.technologies.split(',').map((tech, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded bg-slate-700/50 text-slate-300"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center gap-3">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Source
                        </a>
                      )}
                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 ml-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {certs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Certifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certs.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white">{c.name}</h4>
                      <p className="text-[11px] text-slate-400">{c.issuingOrganization}</p>
                      {c.issueDate && (
                        <p className="text-[10px] text-slate-500">Issued: {c.issueDate}</p>
                      )}
                    </div>
                    {c.credentialUrl && (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-indigo-400 hover:text-indigo-300 bg-slate-700/40 rounded-lg"
                        title="Verify"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
