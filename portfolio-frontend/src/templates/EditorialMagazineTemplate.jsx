import React from 'react';
import {
  Download,
  ExternalLink,
  MapPin,
  Mail,
  GraduationCap,
  Award,
  BookOpen,
  Quote,
  Feather,
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/Icons';

export const EditorialMagazineTemplate = ({
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

  const fontClass =
    fontFamily === 'sans'
      ? 'font-sans'
      : fontFamily === 'mono'
      ? 'font-mono'
      : 'font-serif';

  return (
    <div className={`min-h-screen bg-[#faf8f5] text-stone-900 ${fontClass} selection:bg-amber-100 selection:text-amber-900 pb-24`}>
      {/* Top Publication Header Bar */}
      <div className="border-b border-stone-300 py-3 px-4 sm:px-8 text-center">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans tracking-widest uppercase">
          <span>PORTFOLIO DOSSIER &bull; VOL. {new Date().getFullYear()}</span>
          <span className="font-serif italic capitalize text-stone-700 text-sm">
            Curated by {profile.fullName || portfolio?.username}
          </span>
          <span>EST. {new Date().getFullYear()}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-12 space-y-16">
        {/* Editorial Frontpage Masthead */}
        <div className="text-center space-y-6 pb-12 border-b-2 border-stone-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-300 text-xs font-sans uppercase tracking-widest text-stone-600 bg-white">
            <Feather className="w-3.5 h-3.5 text-stone-500" />
            <span>Monograph &bull; Biography &bull; Works</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-stone-950 font-serif leading-none">
            {profile.fullName || 'Author & Technologist'}
          </h1>

          <p className="text-lg sm:text-xl text-stone-700 italic max-w-2xl mx-auto font-serif">
            &ldquo;{profile.headline || 'Practitioner of software engineering, distributed systems, and modern digital crafts.'}&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-sans text-stone-600 pt-2">
            {profile.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{profile.location}</span>
              </span>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 hover:text-stone-900 transition underline underline-offset-4"
              >
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{profile.email}</span>
              </a>
            )}

            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 transition underline underline-offset-4 flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            )}

            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 transition underline underline-offset-4 flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
          </div>

          {portfolio?.hasResume && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onDownloadResume}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-800 bg-stone-900 text-white font-sans text-xs uppercase tracking-wider hover:bg-stone-800 transition shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Curriculum Vitae (PDF)</span>
              </button>
            </div>
          )}
        </div>

        {/* Narrative Biography / Essay */}
        {profile.bio && (
          <section className="space-y-4">
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-200">
              I. Statement of Intent &amp; Practice
            </h2>
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/80 shadow-xs">
              <p className="text-base sm:text-lg text-stone-800 leading-relaxed font-serif whitespace-pre-line break-words first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-stone-900 first-letter:leading-none">
                {profile.bio}
              </p>
            </div>
          </section>
        )}

        {/* Selected Works / Publications / Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-200">
              II. Selected Projects &amp; Software Artifacts
            </h2>

            <div className="divide-y divide-stone-200">
              {projects.map((proj, idx) => (
                <article key={proj.id} className="py-8 space-y-3 first:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xs text-stone-400 font-bold">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="text-2xl font-normal text-stone-900 font-serif">
                        {proj.title}
                      </h3>
                      {proj.featured && (
                        <span className="font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 font-sans text-xs pt-1 sm:pt-0">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-600 hover:text-stone-950 underline underline-offset-4 flex items-center gap-1"
                        >
                          <Github className="w-3.5 h-3.5" /> Source Code
                        </a>
                      )}
                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-900 font-bold hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live System
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif break-words">
                    {proj.description}
                  </p>

                  {proj.technologies && (
                    <p className="text-xs font-sans text-stone-500 pt-1">
                      <span className="font-semibold text-stone-700">Apparatus:</span> {proj.technologies}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {experiences.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-200">
              III. Professional Chronology &amp; Appointments
            </h2>

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-xl font-normal text-stone-900 font-serif">
                      {exp.role} &mdash; <span className="italic text-stone-700">{exp.company}</span>
                    </h3>
                    <span className="font-sans text-xs text-stone-500">
                      {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="font-sans text-xs text-stone-500">{exp.location}</p>
                  )}
                  <p className="text-sm text-stone-700 leading-relaxed font-serif pt-1 break-words">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Catalog */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-200">
              IV. Technical Lexicon &amp; Competencies
            </h2>

            <div className="flex flex-wrap gap-2.5 font-sans">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-stone-300 text-xs text-stone-800"
                >
                  <span className="font-semibold">{s.name}</span>
                  {s.proficiencyLevel && (
                    <span className="text-stone-400 text-[10px] ml-1">({s.proficiencyLevel})</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Academic Foundations & Certifications */}
        {(profile.education || certs.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-stone-200">
            {profile.education && (
              <div className="space-y-2">
                <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-400">
                  Academic Foundations
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-serif whitespace-pre-line break-words">
                  {profile.education}
                </p>
              </div>
            )}

            {certs.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-400">
                  Conferred Certifications
                </h3>
                <ul className="space-y-1.5 text-xs font-sans text-stone-700">
                  {certs.map((c) => (
                    <li key={c.id} className="flex items-center justify-between gap-2">
                      <span>{c.name} ({c.issuingOrganization})</span>
                      {c.credentialUrl && (
                        <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="text-stone-900 underline">
                          Record
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Colophon Footer */}
        <footer className="pt-16 border-t-2 border-stone-800 text-center text-xs font-sans text-stone-500 space-y-1">
          <p className="tracking-widest uppercase">COLOPHON &bull; PUBLISHED VIA PORTFOLIFY</p>
          <p className="font-serif italic">&copy; {new Date().getFullYear()} {profile.fullName || portfolio?.username}. All Text &amp; Works Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default EditorialMagazineTemplate;

