import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TEMPLATES, SAMPLE_PORTFOLIO } from '../templates/templatesData';
import TemplateRenderer from '../templates/TemplateRenderer';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Palette,
  FileText,
  Globe,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Eye,
  ChevronDown,
  Star,
  Zap,
  Code2,
  Users,
  Compass,
} from 'lucide-react';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: 'Do I need any programming experience to use Portfolify?',
      a: 'Zero coding required! Portfolify works like an intuitive website builder. Simply browse our professionally designed templates, input your skills, projects, and work history, and your responsive portfolio website is generated automatically.',
    },
    {
      q: 'Can I switch between templates after filling out my details?',
      a: 'Yes, absolutely! All your projects, skills, education, experience, and uploaded resume are decoupled from the layout. You can switch between any of the 6 distinct template architectures at any time with a single click, and your site re-flows seamlessly.',
    },
    {
      q: 'Can recruiters download my actual PDF resume from the portfolio?',
      a: 'Yes. Portfolify includes dedicated PDF resume management. When you upload your PDF resume, a direct "Download Resume" button is built into your public portfolio template.',
    },
    {
      q: 'What will my public portfolio URL look like?',
      a: 'You receive a personalized public URL such as portfolify.com/p/yourname (rendered in our app as /p/:username). You can toggle your portfolio between public and private draft mode whenever you want.',
    },
    {
      q: 'Can I customize the accent colors and fonts?',
      a: 'Yes! Portfolify provides instant design controls allowing you to customize accent color palettes (Electric Indigo, Cyber Emerald, Royal Violet, Deep Cyan, Solar Amber, Vibrant Rose, Slate) and typography (Modern Sans, Editorial Serif, Technical Mono).',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Computer Science Student, Final Year',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      text: 'Using the Student Portfolio template, I got my capstones and Coursera certs organized in 15 minutes. Received interview calls from two top tech firms who loved the clean layout!',
      sampleTag: 'Sample Student Feedback',
    },
    {
      name: 'Marcus Chen',
      role: 'Full-Stack Developer @ FinTech startup',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'The Modern Developer template is pure fire. The terminal aesthetic, code snippet bio, and direct GitHub links feel tailored for engineers who want to stand out from generic templates.',
      sampleTag: 'Sample Engineer Feedback',
    },
    {
      name: 'Elena Rostova',
      role: 'Senior Product Designer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: 'The Creative Designer layout gave my visual case studies the spotlight they deserve. The oversized typography and magazine composition are gorgeous.',
      sampleTag: 'Sample Designer Feedback',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Portfoli<span className="text-indigo-400">fy</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#templates" className="hover:text-white transition">Templates</a>
            <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#examples" className="hover:text-white transition">Showcase</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/30"
              >
                <span>Launch Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/30"
                >
                  <span>Create Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/60 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Ready Personal Portfolio Website Builder Platform
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Build Your Professional Portfolio{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              in Minutes
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Select a designer template, fill in your technical skills and projects, customize your colors and fonts, and publish a stunning personal portfolio website with zero code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to={isAuthenticated ? "/builder" : "/register"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 duration-150 cursor-pointer"
            >
              <span>Create Your Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white rounded-2xl border border-slate-800 transition cursor-pointer"
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Explore Templates</span>
            </a>
          </div>

          {/* Value Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 6 Distinct Layout Architectures
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant PDF Resume Integration
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1-Click Publishing to /p/:username
            </span>
          </div>
        </div>
      </section>

      {/* Template Showcase Section */}
      <section id="templates" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Template Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              10 Genuinely Distinct Designs. Not Just Color Swaps.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every template has its own unique visual composition, content hierarchy, and tailored typography suited for specific roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900/60 rounded-3xl border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 group shadow-xl"
              >
                <div>
                  {/* Decorative Thumbnail Header */}
                  <div
                    className="h-44 p-6 flex flex-col justify-between"
                    style={{
                      background:
                        t.id === 'modern-dev'
                          ? 'linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)'
                          : t.id === 'creative-designer'
                          ? 'linear-gradient(135deg, #0e0e10 0%, #3b0764 100%)'
                          : t.id === 'executive'
                          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                          : t.id === 'bento-grid'
                          ? 'linear-gradient(135deg, #090d16 0%, #2e1065 100%)'
                          : t.id === 'student'
                          ? 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)'
                          : t.id === 'terminal-hacker'
                          ? 'linear-gradient(135deg, #022c22 0%, #052e16 100%)'
                          : t.id === 'neo-brutalist'
                          ? 'linear-gradient(135deg, #ca8a04 0%, #713f12 100%)'
                          : t.id === 'editorial-magazine'
                          ? 'linear-gradient(135deg, #78350f 0%, #451a03 100%)'
                          : t.id === 'startup-founder'
                          ? 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)'
                          : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-white backdrop-blur-md">
                        {t.badge}
                      </span>
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.accent }} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.category} Layout</span>
                      <h3 className="text-xl font-black text-white">{t.name}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {t.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Features:</p>
                      <ul className="text-xs text-slate-300 space-y-1">
                        {t.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            <span className="truncate">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPreviewTemplate(t)}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-800 hover:bg-slate-800/80 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>

                  <Link
                    to={isAuthenticated ? "/builder" : "/register"}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition"
            >
              <span>View full template comparison guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-b border-slate-900">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Step-by-Step Flow</span>
            <h2 className="text-3xl font-bold text-white">How Portfolify Works</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              From zero to a published personal website in four straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-sm border border-indigo-500/30">
                1
              </div>
              <h4 className="text-base font-bold text-white">Pick a Template</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Browse our gallery of 6 distinct architectures and pick the design matching your field.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center text-sm border border-purple-500/30">
                2
              </div>
              <h4 className="text-base font-bold text-white">Fill Your Details</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add your technical skills, capstone projects, work experience, certifications, and upload your resume PDF.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 font-bold flex items-center justify-center text-sm border border-pink-500/30">
                3
              </div>
              <h4 className="text-base font-bold text-white">Style & Live Preview</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose accent palettes and typography with real-time responsive preview on desktop, tablet, and mobile.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                4
              </div>
              <h4 className="text-base font-bold text-white">Publish with 1 Click</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Publish to your unique public URL at /p/:username and share directly with recruiters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Features</span>
            <h2 className="text-3xl font-bold text-white">Built for High-Impact Portfolios</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Everything modern developers and students need to present their credentials professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <Zap className="w-6 h-6 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Instant Template Re-flow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your content is stored cleanly in MySQL. Switching templates immediately renders your data in the new architecture.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <FileText className="w-6 h-6 text-purple-400" />
              <h3 className="text-base font-bold text-white">Secure PDF Resume Manager</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload your PDF resume with validation. Direct download links are seamlessly embedded for recruiters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <Globe className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Instant Public URL</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Share your personal link at <code>portfolify.com/p/yourname</code>. Toggle publish or unpublish at any moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Portfolios Showcase */}
      <section id="examples" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-b border-slate-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Showcase</span>
            <h2 className="text-3xl font-bold text-white">Sample Live Portfolios Built with Portfolify</h2>
            <p className="text-xs text-slate-400">Click any example to experience the live template rendering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => setSelectedPreviewTemplate(TEMPLATES.find((t) => t.id === 'modern-dev'))}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-emerald-400 font-mono">/p/devamanohar</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live</span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition">Deva Manohar — Modern Developer</h4>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">Full Stack Engineer & Distributed Systems Enthusiast with Java, Spring Boot & React.</p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span>View Sample Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => setSelectedPreviewTemplate(TEMPLATES.find((t) => t.id === 'student'))}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-blue-400 font-mono">/p/priyasharma</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Live</span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition">Priya Sharma — Student Portfolio</h4>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">B.Tech CS Student with 3.9 GPA, AWS Certification, and Capstone projects.</p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span>View Sample Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => setSelectedPreviewTemplate(TEMPLATES.find((t) => t.id === 'bento-grid'))}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500/40 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-violet-400 font-mono">/p/alexcreator</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">Live</span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-violet-400 transition">Alex Chen — Tech Bento Grid</h4>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">Modular grid showcasing live project stats, featured applications, and social reach.</p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span>View Sample Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Testimonials</span>
            <h2 className="text-3xl font-bold text-white">Loved by Developers, Students & Designers</h2>
            <p className="text-xs text-slate-400">Authentic experiences from creators using Portfolify.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h5 className="text-xs font-bold text-white">{t.name}</h5>
                      <p className="text-[10px] text-slate-400">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">{t.sampleTag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Questions & Answers</span>
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-white hover:text-indigo-400 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : 'text-slate-500'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Build Your Portfolio Website Today
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Choose a template, personalize your credentials, and publish your URL in under 10 minutes.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Create Your Free Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="font-bold text-slate-300">Portfolify</span>
          <span>— Personal Portfolio Website Builder Platform</span>
        </div>
        <p>© 2026 Portfolify. Full-Stack React, Tailwind, Spring Boot & MySQL.</p>
      </footer>

      {/* Live Sample Preview Modal */}
      {selectedPreviewTemplate && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex flex-col items-center p-2 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col my-auto max-h-[92vh]">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {selectedPreviewTemplate.name} — Live Demonstration
                </h3>
                <p className="text-[11px] text-slate-400">Populated with sample portfolio content</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={isAuthenticated ? "/builder" : "/register"}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition"
                >
                  Use This Template
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedPreviewTemplate(null)}
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TemplateRenderer
                portfolio={SAMPLE_PORTFOLIO}
                templateId={selectedPreviewTemplate.id}
                themeColor="indigo"
                fontFamily="sans"
                onDownloadResume={() => alert('Resume download simulated in demo.')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
