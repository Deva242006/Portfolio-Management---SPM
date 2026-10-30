import React from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  FolderGit2,
  Download,
  Mail,
  MapPin,
  ExternalLink,
  Target,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const StudentPortfolioTemplate = ({
  portfolio,
  themeColor = 'cyan',
  fontFamily = 'sans',
  onDownloadResume,
}) => {
  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experiences = portfolio?.experiences || [];
  const certs = portfolio?.certifications || [];

  const themeTextColors = {
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    violet: 'text-violet-600',
    cyan: 'text-blue-600',
    amber: 'text-amber-600',
    rose: 'text-rose-600',
    slate: 'text-slate-800',
  };

  const themeBgColors = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    violet: 'bg-violet-600 hover:bg-violet-700',
    cyan: 'bg-blue-600 hover:bg-blue-700',
    amber: 'bg-amber-600 hover:bg-amber-700',
    rose: 'bg-rose-600 hover:bg-rose-700',
    slate: 'bg-slate-900 hover:bg-black',
  };

  const textAccent = themeTextColors[themeColor] || 'text-blue-600';
  const bgAccent = themeBgColors[themeColor] || 'bg-blue-600';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
        {/* Academic Profile Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-6">
          {/* Internship Objective Banner */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-sm">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Internship & Graduate Goal</span>
                <p className="text-sm font-semibold text-slate-800">
                  Seeking Software Engineering Internship & Full-Time New Grad Roles
                </p>
              </div>
            </div>

            {portfolio?.hasResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white ${bgAccent} shadow-md transition active:scale-95 cursor-pointer whitespace-nowrap`}
              >
                <Download className="w-4 h-4" />
                Download Student Resume (PDF)
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pt-4">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-slate-100 shadow-md"
              />
            ) : (
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-5xl shadow-md">
                {(profile.fullName || portfolio?.username || 'S').charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                CS Student & Software Developer
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {profile.fullName || portfolio?.username}
              </h1>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                {profile.headline || 'Computer Science Student passionate about Software Architecture'}
              </p>

              {profile.location && (
                <p className="flex items-center justify-center sm:justify-start gap-1 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </p>
              )}

              {/* Social Links */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                {profile.githubUrl && (
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition" title="GitHub">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition" title="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition" title="Email">
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Education Highlight Section */}
        {profile.education && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Academic Background & Education</h2>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
              {profile.education}
            </div>
          </div>
        )}

        {/* About / Summary */}
        {profile.bio && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900">About Me</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Academic & Personal Projects */}
        {projects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className={`w-5 h-5 ${textAccent}`} />
                <h2 className="text-xl font-bold text-slate-900">Capstone & Side Projects</h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">{projects.length} Projects</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {proj.imageUrl && (
                      <div className="h-40 bg-slate-100 overflow-hidden">
                        <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      </div>
                    )}
                    <div className="p-5 space-y-2.5">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>
                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.technologies.split(',').map((tech, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900">
                        <Github className="w-3.5 h-3.5" /> Repository
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 text-xs font-semibold ${textAccent} hover:underline`}>
                        <ExternalLink className="w-3.5 h-3.5" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Skills Badges */}
        {skills.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Technical Competencies & Coursework</h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <div key={skill.id} className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-800">{skill.name}</span>
                  <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                    {skill.proficiencyLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Grid */}
        {certs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className={`w-5 h-5 ${textAccent}`} />
              <h2 className="text-xl font-bold text-slate-900">Online Certifications & Badges</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {certs.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-900">{c.name}</h3>
                    <p className="text-[11px] text-slate-500">{c.issuingOrganization}</p>
                    {c.issueDate && <p className="text-[10px] text-slate-400">Issued: {c.issueDate}</p>}
                  </div>
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noreferrer" className={`text-xs ${textAccent} hover:underline font-semibold`}>
                      Verify
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="pt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {profile.fullName || portfolio?.username}. Built with Portfolify.
        </footer>
      </div>
    </div>
  );
};

export default StudentPortfolioTemplate;

