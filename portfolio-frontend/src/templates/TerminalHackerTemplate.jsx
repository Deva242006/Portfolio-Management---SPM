import React, { useState } from 'react';
import {
  Terminal,
  Code2,
  FolderGit2,
  Cpu,
  Download,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Award,
  ChevronRight,
  GitBranch,
  Circle,
  Copy,
  Check,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const TerminalHackerTemplate = ({
  portfolio,
  themeColor = 'emerald',
  fontFamily = 'mono',
  onDownloadResume,
}) => {
  const [copiedCmd, setCopiedCmd] = useState('');
  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experiences = portfolio?.experiences || [];
  const certs = portfolio?.certifications || [];

  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(''), 2000);
  };

  // Neon theme color maps
  const colorMap = {
    emerald: {
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      glow: 'shadow-emerald-500/20',
      accent: 'emerald',
      hex: '#10b981',
    },
    cyan: {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      glow: 'shadow-cyan-500/20',
      accent: 'cyan',
      hex: '#06b6d4',
    },
    amber: {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      glow: 'shadow-amber-500/20',
      accent: 'amber',
      hex: '#f59e0b',
    },
    indigo: {
      text: 'text-indigo-400',
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/10',
      glow: 'shadow-indigo-500/20',
      accent: 'indigo',
      hex: '#818cf8',
    },
    violet: {
      text: 'text-violet-400',
      border: 'border-violet-500/30',
      bg: 'bg-violet-500/10',
      glow: 'shadow-violet-500/20',
      accent: 'violet',
      hex: '#a78bfa',
    },
    rose: {
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      glow: 'shadow-rose-500/20',
      accent: 'rose',
      hex: '#fb7185',
    },
    slate: {
      text: 'text-slate-300',
      border: 'border-slate-500/30',
      bg: 'bg-slate-500/10',
      glow: 'shadow-slate-500/20',
      accent: 'slate',
      hex: '#94a3b8',
    },
  };

  const theme = colorMap[themeColor] || colorMap.emerald;

  const fontClass =
    fontFamily === 'serif'
      ? 'font-serif'
      : fontFamily === 'sans'
      ? 'font-sans'
      : 'font-mono';

  return (
    <div className={`min-h-screen bg-[#070b12] text-slate-200 ${fontClass} selection:bg-emerald-500/30 selection:text-white pb-20`}>
      {/* Top Simulated Terminal Frame Header */}
      <div className="sticky top-0 z-20 bg-[#0c121e]/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-500 ml-2">bash - 80x24</span>
          <span className="text-slate-400 hidden sm:inline">
            // {profile.fullName || portfolio?.username}@portfolify: ~
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">TTY_ONLINE</span>
          </span>
          <span className="hidden md:inline font-mono text-slate-500">PORT: 8080</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Terminal Header Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none select-none">
            <Terminal className="w-64 h-64 text-white" />
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
            <div className="flex items-start gap-5">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className={`w-24 h-24 rounded-xl object-cover border-2 ${theme.border} shadow-lg`}
                />
              ) : (
                <div className={`w-24 h-24 rounded-xl bg-slate-900 border-2 ${theme.border} flex flex-col items-center justify-center font-mono ${theme.text}`}>
                  <Terminal className="w-8 h-8 mb-1" />
                  <span className="text-xs">&gt;_ ROOT</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${theme.bg} ${theme.text} border ${theme.border}`}>
                    DEV_ID: {portfolio?.username || 'user'}
                  </span>
                  <span className="text-xs font-mono text-slate-500">v3.4.0-stable</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {profile.fullName || 'Anonymous Architect'}
                </h1>

                <p className={`text-sm sm:text-base font-semibold ${theme.text} flex items-center gap-2`}>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  <span>{profile.headline || 'Full-Stack Systems Engineer'}</span>
                </p>

                {profile.location && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>LOC: {profile.location}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Quick Action Commands */}
            <div className="flex flex-wrap md:flex-col items-start gap-2 pt-2 md:pt-0">
              {portfolio?.hasResume && (
                <button
                  type="button"
                  onClick={onDownloadResume}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-slate-800 hover:bg-slate-700 border ${theme.border} transition flex items-center gap-2 shadow-sm active:scale-95`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>curl -O resume.pdf</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Cat bio.txt */}
        {profile.bio && (
          <div className="rounded-2xl bg-[#0c121e] border border-slate-800 p-6 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800/80 pb-2">
              <span className="flex items-center gap-2">
                <span className={theme.text}>$</span> cat /var/log/about_me.md
              </span>
              <button
                type="button"
                onClick={() => copyCommand(profile.bio)}
                className="hover:text-slate-300 transition text-[11px] flex items-center gap-1"
              >
                {copiedCmd === profile.bio ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>copy</span>
              </button>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line break-words pt-1 font-mono">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Section 2: Skills Diagnostics */}
        {skills.length > 0 && (
          <section className="space-y-4 font-mono">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Code2 className={`w-4 h-4 ${theme.text}`} />
                <span className="text-white font-bold text-sm">ls -la /tech/skills</span>
              </div>
              <span className="text-slate-500 text-xs">[{skills.length} modules loaded]</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-xl bg-[#0d1424] border border-slate-800/80 hover:border-slate-700 transition space-y-2 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition truncate">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${theme.bg} ${theme.text} border ${theme.border} flex-shrink-0`}>
                      {skill.proficiencyLevel || 'Active'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
                    <span className="truncate">{skill.category}</span>
                    <span className="text-[10px] text-slate-600 font-mono">0x2A</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Git Repositories / Projects */}
        {projects.length > 0 && (
          <section className="space-y-4 font-mono">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <FolderGit2 className={`w-4 h-4 ${theme.text}`} />
                <span className="text-white font-bold text-sm">git log --stat --projects</span>
              </div>
              <span className="text-slate-500 text-xs">{projects.length} commits verified</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800/90 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-500 font-mono flex items-center gap-1.5">
                        <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                        <span>branch/main#{idx + 1}</span>
                      </span>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          FEATURED
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white">{proj.title}</h3>

                    <p className="text-xs text-slate-400 leading-relaxed break-words">
                      {proj.description}
                    </p>

                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.technologies.split(',').map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80 text-xs">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition hover:underline"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>code</span>
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 ${theme.text} hover:underline font-bold`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>preview()</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Experience Trace */}
        {experiences.length > 0 && (
          <section className="space-y-4 font-mono">
            <div className="flex items-center gap-2 text-xs border-b border-slate-800 pb-2">
              <Cpu className={`w-4 h-4 ${theme.text}`} />
              <span className="text-white font-bold text-sm">history | grep --experience</span>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800/80 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${exp.current ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                    </div>
                    <p className={`text-xs ${theme.text} font-semibold`}>
                      @{exp.company} {exp.location ? `// ${exp.location}` : ''}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line break-words pt-1">
                      {exp.description}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 self-start sm:self-auto flex-shrink-0">
                    {exp.startDate} - {exp.current ? 'NOW' : exp.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Certifications & Education */}
        {(certs.length > 0 || profile.education) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800 font-mono">
            {profile.education && (
              <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-2">
                <span className="text-xs text-slate-500 uppercase tracking-widest block font-bold">
                  // Academic Qualifications
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line break-words">
                  {profile.education}
                </p>
              </div>
            )}

            {certs.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-3">
                <span className="text-xs text-slate-500 uppercase tracking-widest block font-bold">
                  // Verified Credentials
                </span>
                <div className="space-y-2">
                  {certs.map((c) => (
                    <div key={c.id} className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-300 font-medium truncate">{c.name}</span>
                      {c.credentialUrl && (
                        <a
                          href={c.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`text-[11px] ${theme.text} hover:underline flex-shrink-0`}
                        >
                          [verify]
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Terminal Command Prompt Footer */}
        <footer className="pt-10 text-center font-mono text-xs text-slate-600 space-y-2 border-t border-slate-800/80">
          <p>
            echo "Crafted with Portfolify CLI Engine" &gt;&gt; /dev/null
          </p>
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} {profile.fullName || portfolio?.username}. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TerminalHackerTemplate;

