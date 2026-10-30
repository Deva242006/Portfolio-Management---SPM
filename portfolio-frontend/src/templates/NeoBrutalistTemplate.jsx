import React from 'react';
import {
  Sparkles,
  Download,
  ExternalLink,
  MapPin,
  Mail,
  GraduationCap,
  Award,
  Briefcase,
  Code2,
  FolderGit2,
  Star,
  CheckCircle,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const NeoBrutalistTemplate = ({
  portfolio,
  themeColor = 'amber',
  fontFamily = 'sans',
  onDownloadResume,
}) => {
  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experiences = portfolio?.experiences || [];
  const certs = portfolio?.certifications || [];

  // Neo-brutalist bold color mappings
  const colorMap = {
    amber: {
      bgMain: 'bg-amber-300',
      badge: 'bg-yellow-400',
      accent: 'bg-amber-400',
      btn: 'bg-amber-400 hover:bg-amber-300 text-black',
    },
    emerald: {
      bgMain: 'bg-emerald-300',
      badge: 'bg-emerald-400',
      accent: 'bg-emerald-400',
      btn: 'bg-emerald-400 hover:bg-emerald-300 text-black',
    },
    rose: {
      bgMain: 'bg-pink-300',
      badge: 'bg-pink-400',
      accent: 'bg-pink-400',
      btn: 'bg-pink-400 hover:bg-pink-300 text-black',
    },
    indigo: {
      bgMain: 'bg-indigo-300',
      badge: 'bg-indigo-400',
      accent: 'bg-indigo-400',
      btn: 'bg-indigo-400 hover:bg-indigo-300 text-black',
    },
    violet: {
      bgMain: 'bg-purple-300',
      badge: 'bg-purple-400',
      accent: 'bg-purple-400',
      btn: 'bg-purple-400 hover:bg-purple-300 text-black',
    },
    cyan: {
      bgMain: 'bg-cyan-300',
      badge: 'bg-cyan-400',
      accent: 'bg-cyan-400',
      btn: 'bg-cyan-400 hover:bg-cyan-300 text-black',
    },
    slate: {
      bgMain: 'bg-stone-300',
      badge: 'bg-stone-400',
      accent: 'bg-stone-400',
      btn: 'bg-stone-400 hover:bg-stone-300 text-black',
    },
  };

  const theme = colorMap[themeColor] || colorMap.amber;

  const fontClass =
    fontFamily === 'serif'
      ? 'font-serif'
      : fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  return (
    <div className={`min-h-screen bg-[#fffdf0] text-black ${fontClass} selection:bg-black selection:text-yellow-300 pb-20`}>
      {/* Top Ticker Bar */}
      <div className="bg-black text-white text-xs font-black tracking-widest uppercase py-2 px-4 border-b-4 border-black overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-4 animate-pulse">
          <span>★ AVAILABLE FOR HIGH-IMPACT ROLES</span>
          <span className="hidden sm:inline">★ FULL-STACK EXPERTISE</span>
          <span className="hidden md:inline">★ PORTFOLIO VERIFIED</span>
        </div>
        <span className="font-mono text-yellow-300 text-[11px]">
          {portfolio?.username || 'neo-creator'}
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
        {/* Hero Card */}
        <div className={`p-6 sm:p-10 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${theme.bgMain} relative overflow-hidden`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-block px-3 py-1 bg-white border-2 border-black rounded-lg text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                ⚡ PORTFOLIO OF THE FUTURE
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-black">
                {profile.fullName || 'Creative Technologist'}
              </h1>

              <p className="text-base sm:text-xl font-bold bg-white inline-block px-3 py-1.5 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black">
                {profile.headline || 'Full-Stack Software Engineer & Builder'}
              </p>

              {profile.location && (
                <p className="flex items-center gap-1.5 text-xs font-bold text-black font-mono">
                  <MapPin className="w-4 h-4 stroke-[3]" />
                  <span>{profile.location}</span>
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {portfolio?.hasResume && (
                  <button
                    type="button"
                    onClick={onDownloadResume}
                    className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-white hover:bg-yellow-100 text-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 stroke-[3]" />
                    <span>Download CV</span>
                  </button>
                )}

                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 active:translate-x-1 active:translate-y-1 active:shadow-none transition"
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
                    className="p-2.5 rounded-xl bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 active:translate-x-1 active:translate-y-1 active:shadow-none transition"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}

                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-2.5 rounded-xl bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 active:translate-x-1 active:translate-y-1 active:shadow-none transition"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {profile.avatarUrl ? (
              <div className="relative self-center sm:self-auto flex-shrink-0">
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-32 h-32 sm:w-44 sm:h-44 object-cover rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-2"
                />
              </div>
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center font-black text-3xl rotate-2">
                <span>⚡</span>
                <span className="text-xs uppercase mt-1">Ready</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio Sticker Box */}
        {profile.bio && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-2">
            <span className="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-widest rounded-md">
              WHO AM I?
            </span>
            <p className="text-sm sm:text-base font-bold text-black leading-relaxed whitespace-pre-line break-words pt-1">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-yellow-400 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Code2 className="w-5 h-5 stroke-[3]" />
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight">Superpowers & Stack</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <div
                  key={skill.id}
                  className={`p-3 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white hover:bg-yellow-50 transition flex items-center gap-2 ${
                    i % 3 === 0 ? '-rotate-1' : i % 3 === 1 ? 'rotate-1' : 'rotate-0'
                  }`}
                >
                  <span className="text-xs font-black text-black">{skill.name}</span>
                  {skill.proficiencyLevel && (
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-black text-white uppercase">
                      {skill.proficiencyLevel}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-pink-400 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <FolderGit2 className="w-5 h-5 stroke-[3]" />
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight">Things I Built</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {proj.imageUrl && (
                      <div className="h-44 border-b-4 border-black overflow-hidden bg-yellow-100">
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl font-black text-black">{proj.title}</h3>
                        {proj.featured && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-yellow-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            ★ TOP PICK
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-bold text-stone-700 leading-relaxed break-words">
                        {proj.description}
                      </p>

                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.technologies.split(',').map((tech, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-black px-2 py-0.5 rounded bg-cyan-100 border border-black text-black"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t-3 border-black mt-4">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black hover:underline"
                      >
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(250,204,21,1)] hover:bg-stone-900 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Timeline */}
        {experiences.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-400 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Briefcase className="w-5 h-5 stroke-[3]" />
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight">Battle Experience</h2>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-black text-black">{exp.role}</h4>
                    <p className="text-xs font-black bg-cyan-200 inline-block px-2 py-0.5 border border-black rounded">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </p>
                    <p className="text-xs font-bold text-stone-700 leading-relaxed break-words pt-1">
                      {exp.description}
                    </p>
                  </div>

                  <span className="text-xs font-black bg-yellow-300 px-3 py-1 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] self-start sm:self-auto flex-shrink-0">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="pt-10 border-t-4 border-black text-center font-black text-xs space-y-1">
          <p className="uppercase">
            Designed on Portfolify • Pure Neo-Brutalist Energy
          </p>
          <p className="text-stone-500 font-mono text-[11px]">
            &copy; {new Date().getFullYear()} {profile.fullName || portfolio?.username}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NeoBrutalistTemplate;

