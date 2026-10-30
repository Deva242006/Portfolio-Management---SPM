import React from 'react';
import {
  Briefcase,
  Award,
  GraduationCap,
  Download,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const ProfessionalExecutiveTemplate = ({
  portfolio,
  themeColor = 'slate',
  fontFamily = 'serif',
  onDownloadResume,
}) => {
  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experiences = portfolio?.experiences || [];
  const certs = portfolio?.certifications || [];

  const themeTextColors = {
    indigo: 'text-indigo-700',
    emerald: 'text-emerald-700',
    violet: 'text-violet-700',
    cyan: 'text-teal-700',
    amber: 'text-amber-700',
    rose: 'text-rose-700',
    slate: 'text-slate-900',
  };

  const themeBgColors = {
    indigo: 'bg-indigo-700 hover:bg-indigo-800',
    emerald: 'bg-emerald-700 hover:bg-emerald-800',
    violet: 'bg-violet-700 hover:bg-violet-800',
    cyan: 'bg-teal-700 hover:bg-teal-800',
    amber: 'bg-amber-700 hover:bg-amber-800',
    rose: 'bg-rose-700 hover:bg-rose-800',
    slate: 'bg-slate-900 hover:bg-black',
  };

  const textAccent = themeTextColors[themeColor] || 'text-slate-900';
  const bgAccent = themeBgColors[themeColor] || 'bg-slate-900';

  return (
    <div className={`min-h-screen bg-[#f8f9fa] text-slate-800 ${fontFamily === 'sans' ? 'font-sans' : fontFamily === 'mono' ? 'font-mono' : 'font-serif'}`}>
      {/* Top Formal Navy Header Banner */}
      <div className="bg-[#1e293b] text-white py-14 px-6 sm:px-12 border-b-4 border-amber-600">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-sans font-bold">
              Executive Profile & Leadership Biography
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              {profile.fullName || portfolio?.username}
            </h1>
            <p className="text-xl text-slate-300 font-light max-w-2xl">
              {profile.headline || 'Chief Technology Officer & Engineering Executive'}
            </p>
            {profile.location && (
              <p className="text-xs text-slate-400 font-sans flex items-center justify-center md:justify-start gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {profile.location}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-32 h-32 rounded-xl object-cover border-2 border-white/20 shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-xl bg-slate-800 text-white font-bold flex items-center justify-center text-4xl border border-slate-700">
                {(profile.fullName || portfolio?.username || 'E').charAt(0).toUpperCase()}
              </div>
            )}

            {portfolio?.hasResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-sans font-bold text-white ${bgAccent} shadow-md transition`}
              >
                <Download className="w-4 h-4" />
                Executive CV
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-16 space-y-16">
        {/* Executive Summary */}
        {profile.bio && (
          <section className="bg-white p-8 sm:p-10 rounded-xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 font-sans">
                Executive Career Summary
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line font-light">
              {profile.bio}
            </p>
          </section>
        )}

        {/* Work Experience / Career History */}
        {experiences.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-slate-300 pb-3">
              <Briefcase className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold uppercase tracking-wider text-slate-900 font-sans">
                Professional Leadership History
              </h2>
            </div>

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                      <p className="text-base font-semibold text-slate-600 font-sans">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs font-sans font-bold px-3 py-1 rounded bg-slate-100 text-slate-700">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Strategic Deliverables & Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-slate-300 pb-3">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold uppercase tracking-wider text-slate-900 font-sans">
                Key Strategic Initiatives & Systems
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">{proj.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{proj.description}</p>
                    {proj.technologies && (
                      <p className="text-[11px] font-sans font-medium text-slate-500">
                        Framework: {proj.technologies}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100 font-sans text-xs">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold">
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline flex items-center gap-1 font-semibold">
                        <ExternalLink className="w-3.5 h-3.5" /> Live System
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Strategic Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 font-sans border-b border-slate-200 pb-2">
              Areas of Technical & Strategic Expertise
            </h2>
            <div className="flex flex-wrap gap-2.5 font-sans">
              {skills.map((skill) => (
                <span key={skill.id} className="px-4 py-1.5 rounded bg-white border border-slate-300 text-xs font-semibold text-slate-800 shadow-2xs">
                  {skill.name} • {skill.proficiencyLevel}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        {(profile.education || certs.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200 font-sans">
            {profile.education && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Academic Credentials
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-5 rounded-xl border border-slate-200">
                  {profile.education}
                </p>
              </div>
            )}

            {certs.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Professional Certifications
                </h3>
                <div className="space-y-2">
                  {certs.map((c) => (
                    <div key={c.id} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{c.name}</p>
                        <p className="text-slate-500">{c.issuingOrganization}</p>
                      </div>
                      {c.credentialUrl && (
                        <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline font-bold">
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

        <footer className="pt-10 border-t border-slate-200 text-center text-xs text-slate-400 font-sans">
          © {new Date().getFullYear()} {profile.fullName || portfolio?.username}. Executive Portfolio generated with Portfolify.
        </footer>
      </div>
    </div>
  );
};

export default ProfessionalExecutiveTemplate;

