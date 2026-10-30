import React from 'react';
import {
  Sparkles,
  ExternalLink,
  Download,
  Mail,
  MapPin,
  ArrowUpRight,
  Palette,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const CreativeDesignerTemplate = ({
  portfolio,
  themeColor = 'rose',
  fontFamily = 'sans',
  onDownloadResume,
}) => {
  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experiences = portfolio?.experiences || [];
  const certs = portfolio?.certifications || [];

  const themeTextColors = {
    indigo: 'text-indigo-500',
    emerald: 'text-emerald-500',
    violet: 'text-violet-500',
    cyan: 'text-cyan-500',
    amber: 'text-amber-500',
    rose: 'text-pink-500',
    slate: 'text-slate-900',
  };

  const themeGradients = {
    indigo: 'from-indigo-600 via-purple-600 to-pink-500',
    emerald: 'from-emerald-500 via-teal-500 to-cyan-500',
    violet: 'from-violet-600 via-fuchsia-500 to-pink-500',
    cyan: 'from-cyan-500 via-blue-500 to-indigo-500',
    amber: 'from-amber-500 via-orange-500 to-rose-500',
    rose: 'from-pink-500 via-rose-500 to-red-500',
    slate: 'from-slate-800 via-slate-900 to-black',
  };

  const textAccent = themeTextColors[themeColor] || 'text-pink-500';
  const gradientAccent = themeGradients[themeColor] || themeGradients.rose;

  return (
    <div className={`min-h-screen bg-[#0e0e10] text-[#f5f5f7] ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'}`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-24">
        {/* Bold Oversized Hero */}
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/15">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Creative Portfolio & Visual Works
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white">
            Hello, I'm <br />
            <span className={`bg-gradient-to-r ${gradientAccent} bg-clip-text text-transparent`}>
              {profile.fullName || portfolio?.username}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed">
            {profile.headline || 'Product Designer, Creative Developer & Digital Craftsman'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            {portfolio?.hasResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradientAccent} shadow-xl hover:scale-105 active:scale-95 transition cursor-pointer`}
              >
                <Download className="w-4 h-4" />
                Download Selected Works / Resume
              </button>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition"
              >
                Let's Talk
              </a>
            )}

            <div className="flex items-center gap-2 pl-2">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Creative Statement / Philosophy */}
        {profile.bio && (
          <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-md space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Creative Direction</h2>
            <p className="text-xl sm:text-2xl font-light text-slate-200 leading-relaxed max-w-4xl whitespace-pre-line">
              "{profile.bio}"
            </p>
          </section>
        )}

        {/* Image-First Project Gallery */}
        {projects.length > 0 && (
          <section className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest ${textAccent}`}>Showcase</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Featured Works</h2>
              </div>
              <p className="text-xs text-slate-400 font-mono">Curated Selection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className={`group rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 hover:border-white/30 transition flex flex-col justify-between ${idx % 3 === 0 ? 'md:col-span-2' : ''}`}
                >
                  {proj.imageUrl ? (
                    <div className="h-64 sm:h-80 w-full overflow-hidden relative bg-black/40">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-tr from-white/[0.08] to-transparent flex items-center justify-center text-slate-500">
                      <Palette className="w-12 h-12 stroke-[1.2]" />
                    </div>
                  )}

                  <div className="p-8 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-pink-400 transition">
                          {proj.title}
                        </h3>
                        {proj.technologies && (
                          <p className="text-xs font-mono text-slate-400 mt-1">
                            {proj.technologies}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition" title="Code">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveDemoUrl && (
                          <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition" title="Demo">
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Aesthetics */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-white/10 pb-4">
              Disciplines & Tooling
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white transition"
                >
                  {skill.name} <span className="opacity-60 text-[10px] font-normal">({skill.proficiencyLevel})</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Credentials */}
        {(experiences.length > 0 || certs.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/10">
            {experiences.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Experience</h3>
                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <p className="text-base font-bold text-white">{exp.role}</p>
                      <p className="text-xs text-pink-400">{exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                      <p className="text-xs text-slate-400 pt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certs.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Honors & Certifications</h3>
                <div className="space-y-4">
                  {certs.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">{c.name}</p>
                        <p className="text-[11px] text-slate-400">{c.issuingOrganization}</p>
                      </div>
                      {c.credentialUrl && (
                        <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="text-xs text-pink-400 hover:underline">
                          Verify
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <footer className="pt-16 border-t border-white/10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {profile.fullName || portfolio?.username}. Designed with Portfolify.
        </footer>
      </div>
    </div>
  );
};

export default CreativeDesignerTemplate;

