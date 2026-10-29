import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  Sparkles,
  Download,
  Globe,
  Mail,
  MapPin,
  GraduationCap,
  ExternalLink,
  Award,
  Star,
  Lock,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const PublicPortfolioPage = () => {
  const { username } = useParams();
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
        const res = await axios.get(`${apiBaseUrl}/api/public/${username}`);
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

    if (username) {
      fetchPublicPortfolio();
    }
  }, [username, apiBaseUrl]);

  const handleDownloadResume = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/public/${username}/resume`, {
        responseType: 'blob',
      });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', `${username}_resume.pdf`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Resume could not be downloaded.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <LoadingSpinner text={`Loading @${username}'s portfolio...`} size="lg" />
      </div>
    );
  }

  if (isPrivateOrNotFound || !portfolio) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mb-6 shadow-xl">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Portfolio is Private</h1>
        <p className="mt-3 text-sm text-slate-400 max-w-md leading-relaxed">
          {errorMessage || `The portfolio for @${username} is either unpublished or does not exist.`}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const profile = portfolio.profile || {};
  const skills = portfolio.skills || [];
  const projects = portfolio.projects || [];
  const certs = portfolio.certifications || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top minimal bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>PortfolioHub</span>
          </Link>

          <div className="flex items-center gap-3">
            {portfolio.hasResume && (
              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}
            <Link
              to="/register"
              className="text-xs text-slate-400 hover:text-white transition hidden sm:inline"
            >
              Build your own
            </Link>
          </div>
        </div>
      </header>

      {/* Main Portfolio Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-12 pb-12 border-b border-slate-800/80">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName || username}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover border-4 border-indigo-500/30 shadow-2xl shadow-indigo-500/20"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
              }}
            />
          ) : (
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-600 text-white font-extrabold flex items-center justify-center text-6xl shadow-2xl shadow-indigo-600/30">
              {(profile.fullName || username).charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                @{username}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {profile.fullName || username}
              </h1>
              <p className="mt-2 text-xl text-indigo-300 font-semibold">
                {profile.headline || 'Software Developer & Problem Solver'}
              </p>
            </div>

            {profile.location && (
              <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{profile.location}</span>
              </p>
            )}

            {/* Social links & contact */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              {portfolio.hasResume && (
                <button
                  type="button"
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/30 active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Resume (PDF)
                </button>
              )}

              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}

              {profile.websiteUrl && (
                <a
                  href={profile.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition"
                  title="Personal Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* About Me & Education */}
        {(profile.bio || profile.education) && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {profile.bio && (
              <div className="lg:col-span-2 space-y-3">
                <h2 className="text-xl font-bold text-white tracking-tight">About Me</h2>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            )}

            {profile.education && (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  Education
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {profile.education}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Technical Skills */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Technical Skills</h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition group"
                >
                  <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                    {skill.proficiencyLevel || 'Proficient'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Showcase */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-tight">Projects & Creations</h2>
              <span className="text-xs text-slate-400 font-mono">{projects.length} showcased</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-indigo-500/50 overflow-hidden flex flex-col justify-between transition group shadow-md"
                >
                  <div>
                    {proj.imageUrl && (
                      <div className="h-44 w-full overflow-hidden bg-slate-950 relative">
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        {proj.featured && (
                          <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                            <Star className="w-3 h-3 fill-white" /> Featured
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition">
                          {proj.title}
                        </h3>
                        {!proj.imageUrl && proj.featured && (
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {proj.description || 'No description provided.'}
                      </p>

                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {proj.technologies.split(',').map((tech, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-4">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certs.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Certifications & Credentials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certs.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-white">{c.name}</h3>
                    <p className="text-xs text-indigo-400 font-medium">{c.issuingOrganization}</p>
                    {c.issueDate && (
                      <p className="text-[11px] text-slate-500">Issued: {c.issueDate}</p>
                    )}
                    {c.credentialId && (
                      <p className="text-[10px] text-slate-500 font-mono">ID: {c.credentialId}</p>
                    )}
                  </div>

                  {c.credentialUrl && (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-indigo-400 hover:text-indigo-300 bg-slate-800/80 rounded-xl transition"
                      title="Verify Credential"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Public Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {profile.fullName || username}. All rights reserved.</p>
          <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Powered by PortfolioHub
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default PublicPortfolioPage;
