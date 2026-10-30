import React from 'react';
import {
  Terminal,
  Code2,
  FolderGit2,
  ExternalLink,
  Download,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  MapPin,
  Mail,
  Star,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const ModernDeveloperTemplate = ({
  portfolio,
  themeColor = 'emerald',
  fontFamily = 'mono',
  onDownloadResume,
}) => {
  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experiences = portfolio?.experiences || [];
  const certs = portfolio?.certifications || [];

  const themeTextColors = {
    indigo: 'text-indigo-400',
    emerald: 'text-emerald-400',
    violet: 'text-violet-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    slate: 'text-slate-300',
  };

  const themeBorderColors = {
    indigo: 'border-indigo-500/40',
    emerald: 'border-emerald-500/40',
    violet: 'border-violet-500/40',
    cyan: 'border-cyan-500/40',
    amber: 'border-amber-500/40',
    rose: 'border-rose-500/40',
    slate: 'border-slate-500/40',
  };

  const themeBgColors = {
    indigo: 'bg-indigo-600 hover:bg-indigo-500',
    emerald: 'bg-emerald-600 hover:bg-emerald-500',
    violet: 'bg-violet-600 hover:bg-violet-500',
    cyan: 'bg-cyan-600 hover:bg-cyan-500',
    amber: 'bg-amber-600 hover:bg-amber-500',
    rose: 'bg-rose-600 hover:bg-rose-500',
    slate: 'bg-slate-700 hover:bg-slate-600',
  };

  const textAccent = themeTextColors[themeColor] || 'text-emerald-400';
  const borderAccent = themeBorderColors[themeColor] || 'border-emerald-500/40';
  const bgAccent = themeBgColors[themeColor] || 'bg-emerald-600';

  return (
    <div className={`min-h-screen bg-[#0b0f19] text-slate-100 ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'sans' ? 'font-sans' : 'font-mono'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
        {/* Terminal Header */}
        <div className="bg-[#111827] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-3 text-xs text-slate-500 font-mono">dev-terminal ~ @{portfolio?.username || 'user'}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Hire
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center md:items-start gap-8">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className={`w-32 h-32 rounded-2xl object-cover border-2 ${borderAccent} shadow-lg`}
              />
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-4xl font-black text-white">
                {(profile.fullName || portfolio?.username || 'D').charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 text-center md:text-left space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {profile.fullName || portfolio?.username}
              </h1>
              <p className={`text-base sm:text-lg font-semibold ${textAccent}`}>
                &gt; {profile.headline || 'Full Stack Engineer & Distributed Systems'}
              </p>

              {profile.location && (
                <p className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </p>
              )}

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                {portfolio?.hasResume && (
                  <button
                    type="button"
                    onClick={onDownloadResume}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white ${bgAccent} rounded-xl transition shadow-lg shadow-emerald-500/20 active:scale-95`}
                  >
                    <Download className="w-4 h-4" />
                    cat resume.pdf
                  </button>
                )}

                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
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
                    className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}

                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Code Snippet Bio */}
        {profile.bio && (
          <div className="bg-[#111827] rounded-2xl border border-slate-800 p-6 space-y-3 font-mono text-xs sm:text-sm overflow-hidden">
            <p className="text-slate-500">// Bio & Philosophy</p>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line break-words">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Categorized Technical Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Code2 className={`w-5 h-5 ${textAccent}`} />
              <span>Technical Stack & Skills</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between gap-2 overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white truncate">{skill.name}</span>
                    {skill.proficiencyLevel && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 ${textAccent} flex-shrink-0 font-medium`}>
                        {skill.proficiencyLevel}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono truncate block">
                    {skill.category || 'General'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Developer Projects Grid */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <FolderGit2 className={`w-5 h-5 ${textAccent}`} />
                <span>Projects & Repositories</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">[{projects.length} repos]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#111827] rounded-2xl border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                        {proj.title}
                      </h3>
                      {proj.featured && (
                        <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          featured
                        </span>
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
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    {proj.githubUrl ? (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
                      >
                        <Github className="w-3.5 h-3.5" /> code
                      </a>
                    ) : <span />}

                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${textAccent} hover:underline`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> live-demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Briefcase className={`w-5 h-5 ${textAccent}`} />
              <span>Experience & Deployments</span>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-white">{exp.role} @ {exp.company}</h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certs */}
        {(profile.education || certs.length > 0) && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-800">
            {profile.education && (
              <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  Education
                </div>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {profile.education}
                </p>
              </div>
            )}

            {certs.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Verified Certifications
                </div>
                <div className="space-y-2 text-xs">
                  {certs.map((c) => (
                    <div key={c.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{c.name}</p>
                        <p className="text-[11px] text-slate-500">{c.issuingOrganization}</p>
                      </div>
                      {c.credentialUrl && (
                        <a href={c.credentialUrl} target="_blank" rel="noreferrer" className={`${textAccent} hover:underline`}>
                          verify
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {profile.fullName || portfolio?.username}. Built with Portfolify.
        </footer>
      </div>
    </div>
  );
};

export default ModernDeveloperTemplate;

