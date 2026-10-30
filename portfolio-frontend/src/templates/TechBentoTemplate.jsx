import React from 'react';
import {
  Sparkles,
  ExternalLink,
  Download,
  FolderGit2,
  Award,
  GraduationCap,
  Briefcase,
  MapPin,
  Mail,
  Star,
  Layers,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const TechBentoTemplate = ({
  portfolio,
  themeColor = 'violet',
  fontFamily = 'sans',
  onDownloadResume,
}) => {
  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experiences = portfolio?.experiences || [];
  const certs = portfolio?.certifications || [];

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.id !== featuredProject?.id);

  const themeTextColors = {
    indigo: 'text-indigo-400',
    emerald: 'text-emerald-400',
    violet: 'text-violet-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    slate: 'text-slate-300',
  };

  const themeGradients = {
    indigo: 'from-indigo-600 to-blue-600',
    emerald: 'from-emerald-600 to-teal-600',
    violet: 'from-violet-600 to-indigo-600',
    cyan: 'from-cyan-600 to-blue-600',
    amber: 'from-amber-600 to-orange-600',
    rose: 'from-rose-600 to-pink-600',
    slate: 'from-slate-800 to-slate-950',
  };

  const textAccent = themeTextColors[themeColor] || 'text-violet-400';
  const gradientAccent = themeGradients[themeColor] || themeGradients.violet;

  return (
    <div className={`min-h-screen bg-[#090d16] text-slate-100 p-4 sm:p-8 lg:p-12 ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'}`}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Tile 1: Hero Profile (Spans 2 cols, 2 rows) */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-800/80 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-500/40 shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-bold flex items-center justify-center text-2xl shadow-md">
                    {(profile.fullName || portfolio?.username || 'B').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {profile.fullName || portfolio?.username}
                  </h1>
                  <p className="text-xs font-mono text-slate-400">@{portfolio?.username}</p>
                </div>
              </div>

              <p className={`text-base font-semibold ${textAccent}`}>
                {profile.headline || 'Full Stack Engineer & System Architect'}
              </p>

              {profile.bio && (
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                  {profile.bio}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              {profile.location && (
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5" /> {profile.location}
                </span>
              )}

              {portfolio?.hasResume && (
                <button
                  type="button"
                  onClick={onDownloadResume}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${gradientAccent} shadow-md transition active:scale-95 cursor-pointer`}
                >
                  <Download className="w-3.5 h-3.5" /> Resume
                </button>
              )}
            </div>
          </div>

          {/* Tile 2: Quick Metrics */}
          <div className="bg-[#111827] rounded-3xl p-6 border border-slate-800/80 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Live Metrics</span>
            <div className="space-y-4 my-2">
              <div>
                <p className="text-3xl font-black text-white">{projects.length}</p>
                <p className="text-xs text-slate-400">Applications Built</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">{skills.length}</p>
                <p className="text-xs text-slate-400">Skills & Frameworks</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">{certs.length}</p>
                <p className="text-xs text-slate-400">Certifications</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Verified Portfolio</p>
          </div>

          {/* Tile 3: Social & Contact Widget */}
          <div className="bg-[#111827] rounded-3xl p-6 border border-slate-800/80 shadow-xl flex flex-col justify-between space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Connect</span>
            <div className="grid grid-cols-2 gap-2">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 transition flex items-center justify-center gap-2 text-xs font-semibold"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 transition flex items-center justify-center gap-2 text-xs font-semibold"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
            </div>

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Mail className="w-3.5 h-3.5" /> {profile.email}
              </a>
            )}
          </div>

          {/* Tile 4: Featured Project Spotlight (Spans 2 cols) */}
          {featuredProject && (
            <div className="md:col-span-2 lg:col-span-2 bg-[#111827] rounded-3xl overflow-hidden border border-slate-800/80 shadow-xl flex flex-col justify-between group">
              {featuredProject.imageUrl && (
                <div className="h-44 w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={featuredProject.imageUrl}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-white" /> Featured Project
                  </span>
                </div>
              )}

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition">
                    {featuredProject.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {featuredProject.githubUrl && (
                      <a href={featuredProject.githubUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {featuredProject.liveDemoUrl && (
                      <a href={featuredProject.liveDemoUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-violet-400">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {featuredProject.description}
                </p>

                {featuredProject.technologies && (
                  <p className="text-[11px] font-mono text-violet-400">
                    {featuredProject.technologies}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Tile 5: Skills Mosaic (Spans 2 cols) */}
          {skills.length > 0 && (
            <div className="md:col-span-2 lg:col-span-2 bg-[#111827] rounded-3xl p-6 border border-slate-800/80 shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Core Stack</span>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs font-medium text-slate-200"
                  >
                    {skill.name} <span className="text-[10px] text-violet-400">({skill.proficiencyLevel})</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tile 6: Experience List */}
          {experiences.length > 0 && (
            <div className="md:col-span-2 lg:col-span-2 bg-[#111827] rounded-3xl p-6 border border-slate-800/80 shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Experience Highlights</span>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-white">{exp.role} @ {exp.company}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    <p className="text-xs text-slate-300 line-clamp-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tile 7: Education & Certs */}
          {(profile.education || certs.length > 0) && (
            <div className="md:col-span-2 lg:col-span-2 bg-[#111827] rounded-3xl p-6 border border-slate-800/80 shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Academic & Credentials</span>
              {profile.education && (
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-800/30 p-3 rounded-xl border border-slate-800">
                  {profile.education}
                </p>
              )}
              {certs.map((c) => (
                <div key={c.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/20">
                  <span className="font-semibold text-white">{c.name}</span>
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">
                      Verify
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="pt-8 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {profile.fullName || portfolio?.username}. Built with Portfolify.
        </footer>
      </div>
    </div>
  );
};

export default TechBentoTemplate;

