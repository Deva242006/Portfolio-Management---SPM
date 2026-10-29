import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  Code2,
  FolderGit2,
  Award,
  FileText,
  Globe,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Portfolio<span className="text-indigo-400">Hub</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/30"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/30"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900 -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            Designed for CS Students & Software Engineers
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Build, Manage, and Share Your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Professional Portfolio
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            PortfolioHub makes it effortless to manage your projects, technical skills, verified certifications, and PDF resumes from a centralized dashboard — automatically generating a modern public portfolio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 duration-150"
            >
              Create Your Free Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white rounded-xl border border-slate-700/80 transition"
            >
              Sign In to Dashboard
            </Link>
          </div>

          {/* Social Proof / Tech stack banner */}
          <div className="pt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> React 18 & Vite
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Spring Boot 3 & Java 21
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> MySQL & JPA
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Spring Security & JWT
            </span>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Everything You Need to Showcase Your Work
            </h2>
            <p className="mt-4 text-slate-400 text-sm">
              Comprehensive tools designed to showcase your real-world development abilities to recruiters and hiring managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 transition group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Categorized Skills Matrix</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Organize your technical competencies into Programming Languages, Frontend, Backend, Databases, and Tools with proficiency tags.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 transition group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Project Portfolio Showcase</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Highlight key projects with live demo links, GitHub repositories, technology badges, descriptions, and featured flags.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 transition group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Verified Certifications</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Add your technical certifications with issuing authority, completion dates, and direct links to verify credentials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 transition group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure PDF Resume Manager</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Upload your resume in PDF format with file validation. Recruiters can download it directly from your public portfolio page.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 transition group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">One-Click Public URL</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate an immediate public link at <code>/u/username</code> that you can toggle published or private anytime with a single click.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 transition group">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Robust Security & Ownership</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Strict JWT-based authentication with Spring Security and server-side authorization ensuring only you can modify your records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">How PortfolioHub Works</h2>
            <p className="mt-3 text-slate-400 text-sm">Three easy steps from registration to sharing your public URL.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                1
              </div>
              <h4 className="text-base font-semibold text-white">Create Your Account</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Register with your details to access your private dashboard with automated profile completion guidance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                2
              </div>
              <h4 className="text-base font-semibold text-white">Curate Your Work</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Input your technical skills, showcase your best development projects, add certifications, and upload your resume.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                3
              </div>
              <h4 className="text-base font-semibold text-white">Publish & Share</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click "Publish" and your personal responsive portfolio is instantly live for recruiters and hiring managers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-indigo-950/40 to-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">Ready to Elevate Your Developer Presence?</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Join PortfolioHub today and generate your professional portfolio website in minutes.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-xl shadow-indigo-600/30"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p>© 2026 PortfolioHub — Full-Stack Personal Portfolio Management System</p>
      </footer>
    </div>
  );
};

export default LandingPage;

