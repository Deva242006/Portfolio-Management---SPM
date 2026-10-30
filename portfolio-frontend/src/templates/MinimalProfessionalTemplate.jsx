import React from 'react';
import {
  Mail,
  MapPin,
  ExternalLink,
  Download,
  Award,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const MinimalProfessionalTemplate = ({
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

  const themeTextColors = {
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    violet: 'text-violet-600',
    cyan: 'text-cyan-600',
    amber: 'text-amber-600',
    rose: 'text-rose-600',
    slate: 'text-slate-800',
  };

  const themeBgColors = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    violet: 'bg-violet-600 hover:bg-violet-700',
    cyan: 'bg-cyan-600 hover:bg-cyan-700',
    amber: 'bg-amber-600 hover:bg-amber-700',
    rose: 'bg-rose-600 hover:bg-rose-700',
    slate: 'bg-slate-900 hover:bg-black',
  };

  const textAccent = themeTextColors[themeColor] || 'text-indigo-600';
  const bgAccent = themeBgColors[themeColor] || 'bg-indigo-600';

  return (
    <div className={`min-h-screen bg-[#fafafa] text-slate-900 ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'}`}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16 sm:py-24 space-y-20">
        {/* Minimal Hero Header */}
        <header className="space-y-6 pb-12 border-b border-slate-200">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className={`text-xs font-semibold uppercase tracking-widest ${textAccent}`}>
                Portfolio of
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                {profile.fullName || portfolio?.username}
              </h1>
              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
                {profile.headline || 'Software Engineer & Consultant'}
              </p>
              {profile.location && (
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </p>
              )}
            </div>

            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-slate-200 shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-3xl">
                {(profile.fullName || portfolio?.username || 'U').charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Socials & Resume */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {portfolio?.hasResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white ${bgAccent} rounded-lg transition shadow-sm`}
              >
                <Download className="w-4 h-4" />
                Download CV / Resume
              </button>
            )}

            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition"
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
                className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </header>

        {/* About Statement */}
        {profile.bio && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">About</h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl whitespace-pre-line">
              {profile.bio}
            </p>
          </section>
        )}

        {/* Selected Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Selected Work</h2>
              <span className="text-xs text-slate-500 font-mono">{projects.length} Projects</span>
            </div>

            <div className="divide-y divide-slate-200">
              {projects.map((project) => (
                <div key={project.id} className="py-8 space-y-3 group">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                        >
                          <Github className="w-3.5 h-3.5" /> Source
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`text-xs font-semibold ${textAccent} hover:underline flex items-center gap-1`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> View Project
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  {project.technologies && (
                    <p className="text-xs font-mono text-slate-400">
                      Technologies: {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {experiences.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 pb-2 border-b border-slate-200">
              Work Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-xs font-mono text-slate-500">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 font-medium">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Competencies */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 pb-2 border-b border-slate-200">
              Core Skills & Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-sm inline-flex items-center gap-1.5"
                >
                  <span className="font-semibold text-slate-900">{s.name}</span>
                  {s.proficiencyLevel && (
                    <span className="text-[10px] text-slate-500 font-normal">({s.proficiencyLevel})</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        {(profile.education || certs.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
            {profile.education && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Education</h2>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {profile.education}
                  </p>
                </div>
              </div>
            )}

            {certs.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Certifications</h2>
                <div className="space-y-3">
                  {certs.map((c) => (
                    <div key={c.id} className="flex items-start justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{c.name}</p>
                        <p className="text-slate-500">{c.issuingOrganization} {c.issueDate ? `(${c.issueDate})` : ''}</p>
                      </div>
                      {c.credentialUrl && (
                        <a href={c.credentialUrl} target="_blank" rel="noreferrer" className={`${textAccent} hover:underline`}>
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

        {/* Footer */}
        <footer className="pt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {profile.fullName || portfolio?.username}.</p>
          <p>Created with Portfolify</p>
        </footer>
      </div>
    </div>
  );
};

export default MinimalProfessionalTemplate;

