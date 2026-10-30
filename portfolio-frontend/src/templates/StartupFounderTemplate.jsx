import React from 'react';
import {
  Sparkles,
  Download,
  ExternalLink,
  MapPin,
  Mail,
  Zap,
  TrendingUp,
  Layers,
  Rocket,
  ShieldCheck,
  ChevronRight,
  Code2,
  FolderGit2,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const StartupFounderTemplate = ({
  portfolio,
  themeColor = 'indigo',
  fontFamily = 'sans',
  onDownloadResume,
}) => {
  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experiences = portfolio?.experiences || [];
  const certs = portfolio?.certifications || [];

  const fontClass =
    fontFamily === 'serif'
      ? 'font-serif'
      : fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  return (
    <div className={`min-h-screen bg-[#0a0d14] text-slate-100 ${fontClass} selection:bg-indigo-500 selection:text-white pb-24`}>
      {/* Top Founder Navigation Bar */}
      <nav className="sticky top-0 z-20 bg-[#0a0d14]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
              <Rocket className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">
              {profile.fullName || portfolio?.username} <span className="text-indigo-400 font-mono text-xs">/ ventures</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {portfolio?.hasResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-sm flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Executive CV</span>
              </button>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition border border-slate-700"
              >
                Let&apos;s Talk
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* SaaS Hero Section */}
        <div className="relative text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Open to Founding Engineer &amp; Principal Roles</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Building software that <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">scales and endures.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {profile.headline || 'Full-Stack Software Architect, Product Engineer, and Technical Maker.'}
          </p>

          {/* Metric Traction Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{projects.length}+</p>
              <p className="text-xs text-slate-400 mt-0.5">Systems Shipped</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">99.9%</p>
              <p className="text-xs text-slate-400 mt-0.5">Uptime &amp; Quality</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">{skills.length}+</p>
              <p className="text-xs text-slate-400 mt-0.5">Core Technologies</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-violet-400">{experiences.length}+</p>
              <p className="text-xs text-slate-400 mt-0.5">Career Milestones</p>
            </div>
          </div>
        </div>

        {/* Founder Bio / Thesis */}
        {profile.bio && (
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Executive Thesis &amp; Background</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line break-words">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Flagship Projects (SaaS Product Cards) */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Flagship Deployments</h2>
                <p className="text-xs text-slate-400 mt-1">High-impact applications and production architectures.</p>
              </div>
              <span className="text-xs font-mono text-slate-500">[{projects.length} live systems]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden hover:border-slate-700 transition flex flex-col justify-between group"
                >
                  <div>
                    {proj.imageUrl && (
                      <div className="h-44 w-full bg-slate-950 overflow-hidden relative">
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition">
                          {proj.title}
                        </h3>
                        {proj.featured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                            Flagship
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed break-words line-clamp-3">
                        {proj.description}
                      </p>

                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.technologies.split(',').map((tech, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4 text-xs">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition"
                      >
                        <Github className="w-3.5 h-3.5" /> Source Code
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-bold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Launch App
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technology Stack Matrix */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Technology Infrastructure</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between space-y-1.5 min-w-0"
                >
                  <span className="text-sm font-bold text-white break-words leading-tight">{skill.name}</span>
                  <div className="flex items-center justify-between text-[11px] gap-1 flex-wrap">
                    <span className="text-slate-500 truncate">{skill.category}</span>
                    <span className="text-indigo-400 font-semibold shrink-0">{skill.proficiencyLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Track Record & Experience */}
        {experiences.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Career Trajectory</h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1 max-w-2xl">
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs font-semibold text-indigo-400">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1 break-words">
                      {exp.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-slate-800 self-start sm:self-auto flex-shrink-0">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Conversion Footer CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/20 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Let&apos;s build the next big thing.</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Available for select engineering leadership advisory, principal consulting, and high-impact full-stack roles.
          </p>
          {profile.email && (
            <div className="pt-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/30"
              >
                <Mail className="w-4 h-4" /> Start a Conversation
              </a>
            </div>
          )}
        </div>

        <footer className="pt-8 text-center text-xs text-slate-600 font-mono">
          &copy; {new Date().getFullYear()} {profile.fullName || portfolio?.username}. Powered by Portfolify Builder Engine.
        </footer>
      </div>
    </div>
  );
};

export default StartupFounderTemplate;

