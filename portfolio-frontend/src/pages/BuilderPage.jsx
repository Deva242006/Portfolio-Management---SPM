import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TemplateRenderer from '../templates/TemplateRenderer';
import { TEMPLATES, THEME_COLORS, FONT_FAMILIES, SAMPLE_PORTFOLIO } from '../templates/templatesData';
import TemplateSelector from '../components/builder/TemplateSelector';
import ThemeCustomizer from '../components/builder/ThemeCustomizer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import {
  Sparkles,
  Layers,
  Palette,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  FileText,
  Eye,
  Globe,
  Share2,
  Copy,
  Check,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
  Plus,
  Trash2,
  Edit2,
  UploadCloud,
} from 'lucide-react';

export const BuilderPage = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('template'); // 'template' | 'style' | 'profile' | 'experience' | 'skills' | 'projects' | 'certs' | 'resume'
  const [previewMode, setPreviewMode] = useState('split'); // 'split' | 'fullscreen'
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Comprehensive Builder State
  const [portfolioData, setPortfolioData] = useState(SAMPLE_PORTFOLIO);

  // Form State
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    headline: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    githubUrl: '',
    linkedinUrl: '',
    websiteUrl: '',
    avatarUrl: '',
    templateId: 'minimal-pro',
    themeColor: 'indigo',
    fontFamily: 'sans',
  });

  const [skillsList, setSkillsList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [experiencesList, setExperiencesList] = useState([]);
  const [certsList, setCertsList] = useState([]);
  const [resumeData, setResumeData] = useState(null);

  // Sub-modals for adding items inline
  const [itemModal, setItemModal] = useState({ open: false, type: null, data: null });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, skillsRes, projectsRes, certsRes, expRes, resumeRes] = await Promise.all([
        api.get('/api/profile').catch(() => ({ data: { data: {} } })),
        api.get('/api/skills').catch(() => ({ data: { data: [] } })),
        api.get('/api/projects').catch(() => ({ data: { data: [] } })),
        api.get('/api/certifications').catch(() => ({ data: { data: [] } })),
        api.get('/api/experiences').catch(() => ({ data: { data: [] } })),
        api.get('/api/resume').catch(() => ({ data: { data: null } })),
      ]);

      const prof = profileRes.data?.data || {};
      const skills = skillsRes.data?.data || [];
      const projs = projectsRes.data?.data || [];
      const certs = certsRes.data?.data || [];
      const exps = expRes.data?.data || [];
      const resm = resumeRes.data?.data || null;

      setProfileForm({
        fullName: prof.fullName || user?.fullName || '',
        headline: prof.headline || '',
        bio: prof.bio || '',
        email: prof.email || user?.email || '',
        phone: prof.phone || '',
        location: prof.location || '',
        education: prof.education || '',
        githubUrl: prof.githubUrl || '',
        linkedinUrl: prof.linkedinUrl || '',
        websiteUrl: prof.websiteUrl || '',
        avatarUrl: prof.avatarUrl || '',
        templateId: prof.templateId || 'minimal-pro',
        themeColor: prof.themeColor || 'indigo',
        fontFamily: prof.fontFamily || 'sans',
      });

      setSkillsList(skills);
      setProjectsList(projs);
      setExperiencesList(exps);
      setCertsList(certs);
      setResumeData(resm);

      updatePreviewObject({
        profile: prof,
        skills,
        projects: projs,
        experiences: exps,
        certifications: certs,
        hasResume: !!resm,
      });
    } catch (err) {
      console.error('Error fetching builder data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updatePreviewObject = (overrides = {}) => {
    setPortfolioData((prev) => ({
      ...prev,
      username: user?.username || 'user',
      published: user?.isPublished,
      profile: {
        ...prev.profile,
        ...profileForm,
        ...(overrides.profile || {}),
      },
      skills: overrides.skills !== undefined ? overrides.skills : skillsList,
      projects: overrides.projects !== undefined ? overrides.projects : projectsList,
      experiences: overrides.experiences !== undefined ? overrides.experiences : experiencesList,
      certifications: overrides.certifications !== undefined ? overrides.certifications : certsList,
      hasResume: overrides.hasResume !== undefined ? overrides.hasResume : !!resumeData,
      templateId: profileForm.templateId,
      themeColor: profileForm.themeColor,
      fontFamily: profileForm.fontFamily,
    }));
  };

  useEffect(() => {
    updatePreviewObject();
  }, [profileForm, skillsList, projectsList, experiencesList, certsList, resumeData]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfileSettings = async (overrides = {}) => {
    setSaving(true);
    try {
      const payload = { ...profileForm, ...overrides };
      const res = await api.put('/api/profile', payload);
      setProfileForm((prev) => ({ ...prev, ...res.data.data }));
      updateUser({
        fullName: res.data.data.fullName,
        avatarUrl: res.data.data.avatarUrl,
      });
      setToastMsg('Portfolio saved successfully!');
      setTimeout(() => setToastMsg(''), 3000);
    } catch (err) {
      console.error('Error saving profile settings', err);
      alert('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleSelectTemplate = (templateId) => {
    setProfileForm((prev) => ({ ...prev, templateId }));
    saveProfileSettings({ templateId });
  };

  const handleColorChange = (themeColor) => {
    setProfileForm((prev) => ({ ...prev, themeColor }));
    saveProfileSettings({ themeColor });
  };

  const handleFontChange = (fontFamily) => {
    setProfileForm((prev) => ({ ...prev, fontFamily }));
    saveProfileSettings({ fontFamily });
  };

  const handleTogglePublish = async () => {
    setPublishLoading(true);
    const nextStatus = !user?.isPublished;
    try {
      const res = await api.put('/api/portfolio/publish', { published: nextStatus });
      updateUser({ isPublished: res.data.data });
      setToastMsg(res.data.data ? 'Portfolio is now LIVE publicly!' : 'Portfolio unpublished (private).');
      setTimeout(() => setToastMsg(''), 4000);
    } catch (err) {
      console.error('Error toggling publish', err);
      alert('Failed to update publish status.');
    } finally {
      setPublishLoading(false);
    }
  };

  const handleCopyLink = () => {
    const publicUrl = `${window.location.origin}/p/${user?.username}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add Item Handlers
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    const data = itemModal.data;
    try {
      if (data.id) {
        const res = await api.put(`/api/skills/${data.id}`, data);
        setSkillsList((prev) => prev.map((s) => (s.id === data.id ? res.data.data : s)));
      } else {
        const res = await api.post('/api/skills', data);
        setSkillsList((prev) => [...prev, res.data.data]);
      }
      setItemModal({ open: false, type: null, data: null });
    } catch (err) {
      alert('Failed to save skill.');
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await api.delete(`/api/skills/${id}`);
      setSkillsList((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert('Failed to delete skill.');
    }
  };

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    const data = itemModal.data;
    try {
      if (data.id) {
        const res = await api.put(`/api/experiences/${data.id}`, data);
        setExperiencesList((prev) => prev.map((exp) => (exp.id === data.id ? res.data.data : exp)));
      } else {
        const res = await api.post('/api/experiences', data);
        setExperiencesList((prev) => [res.data.data, ...prev]);
      }
      setItemModal({ open: false, type: null, data: null });
    } catch (err) {
      alert('Failed to save experience.');
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await api.delete(`/api/experiences/${id}`);
      setExperiencesList((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      alert('Failed to delete experience.');
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const data = itemModal.data;
    try {
      if (data.id) {
        const res = await api.put(`/api/projects/${data.id}`, data);
        setProjectsList((prev) => prev.map((p) => (p.id === data.id ? res.data.data : p)));
      } else {
        const res = await api.post('/api/projects', data);
        setProjectsList((prev) => [res.data.data, ...prev]);
      }
      setItemModal({ open: false, type: null, data: null });
    } catch (err) {
      alert('Failed to save project.');
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/api/projects/${id}`);
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Launching Portfolify Studio..." size="lg" />;
  }

  const publicUrl = `/p/${user?.username}`;

  return (
    <div className="space-y-4 max-w-full -m-4 sm:-m-6 lg:-m-8 animate-in fade-in duration-300 flex flex-col h-[calc(100vh-4rem)]">
      {/* Studio Top Control Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Portfolify Builder Studio</h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${user?.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {user?.isPublished ? 'Live' : 'Draft'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono hidden sm:block">
              {window.location.origin}{publicUrl}
            </p>
          </div>
        </div>

        {/* Center: Device View Toggle */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setDeviceView('desktop')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${deviceView === 'desktop' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Laptop className="w-3.5 h-3.5" /> Desktop
          </button>
          <button
            type="button"
            onClick={() => setDeviceView('tablet')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${deviceView === 'tablet' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Tablet className="w-3.5 h-3.5" /> Tablet
          </button>
          <button
            type="button"
            onClick={() => setDeviceView('mobile')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${deviceView === 'mobile' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
            title="Copy Public Link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {user?.isPublished && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={publishLoading}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition shadow-sm ${
              user?.isPublished
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {publishLoading ? 'Updating...' : user?.isPublished ? 'Unpublish' : 'Publish Portfolio'}
          </button>

          <button
            type="button"
            onClick={() => setPreviewMode(previewMode === 'split' ? 'fullscreen' : 'split')}
            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition lg:hidden"
            title="Toggle Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="mx-6 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Studio Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Studio Editor Panel */}
        <div className={`w-full lg:w-1/2 flex flex-col bg-slate-50 border-r border-slate-200 overflow-hidden ${previewMode === 'fullscreen' ? 'hidden' : 'flex'}`}>
          {/* Navigation Sub-Tabs */}
          <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-1.5 overflow-x-auto flex-shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('template')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                activeTab === 'template'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Template
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('style')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                activeTab === 'style'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Style
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Bio & Info
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                activeTab === 'experience'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Experience
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                activeTab === 'skills'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> Skills
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                activeTab === 'projects'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" /> Projects
            </button>
          </div>

          {/* Editor Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* Tab 1: Template Picker */}
            {activeTab === 'template' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Choose Portfolio Architecture</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select any of the 6 distinct designs. Your content will re-flow instantly in the preview.
                  </p>
                </div>
                <TemplateSelector
                  selectedTemplateId={profileForm.templateId}
                  onSelectTemplate={handleSelectTemplate}
                />
              </div>
            )}

            {/* Tab 2: Style Customizer */}
            {activeTab === 'style' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Customize Colors & Typography</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tailor your portfolio's accent color palette and typographic personality.
                  </p>
                </div>
                <ThemeCustomizer
                  themeColor={profileForm.themeColor}
                  fontFamily={profileForm.fontFamily}
                  onColorChange={handleColorChange}
                  onFontChange={handleFontChange}
                />
              </div>
            )}

            {/* Tab 3: Personal & Bio */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Personal Information & Bio</h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileForm.fullName}
                      onChange={handleProfileChange}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Headline</label>
                    <input
                      type="text"
                      name="headline"
                      value={profileForm.headline}
                      onChange={handleProfileChange}
                      placeholder="e.g. Full Stack Engineer | Java & React"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">About Me (Bio)</label>
                    <textarea
                      rows={4}
                      name="bio"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      placeholder="Write a compelling summary of what you build and care about..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                        placeholder="e.g. San Francisco, CA"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Contact Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Avatar Image URL</label>
                    <input
                      type="url"
                      name="avatarUrl"
                      value={profileForm.avatarUrl}
                      onChange={handleProfileChange}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Education Background</label>
                    <textarea
                      rows={2}
                      name="education"
                      value={profileForm.education}
                      onChange={handleProfileChange}
                      placeholder="Degree, University, GPA, Year..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">GitHub URL</label>
                      <input
                        type="url"
                        name="githubUrl"
                        value={profileForm.githubUrl}
                        onChange={handleProfileChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={profileForm.linkedinUrl}
                        onChange={handleProfileChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => saveProfileSettings()}
                    disabled={saving}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Experience */}
            {activeTab === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Work Experience & Internships</h3>
                  <button
                    type="button"
                    onClick={() =>
                      setItemModal({
                        open: true,
                        type: 'experience',
                        data: { company: '', role: '', startDate: '', endDate: '', current: false, description: '' },
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Experience
                  </button>
                </div>

                <div className="space-y-3">
                  {experiencesList.map((exp) => (
                    <div key={exp.id} className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start justify-between gap-3 hover:border-slate-300 transition">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{exp.role}</h4>
                        <p className="text-xs text-indigo-600 font-semibold">{exp.company}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setItemModal({ open: true, type: 'experience', data: { ...exp } })}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition"
                          title="Edit Experience"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition"
                          title="Delete Experience"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Technical Skills</h3>
                  <button
                    type="button"
                    onClick={() =>
                      setItemModal({
                        open: true,
                        type: 'skill',
                        data: { name: '', category: 'Programming Languages', proficiencyLevel: 'Intermediate' },
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold cursor-pointer shadow-sm hover:bg-indigo-700 transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Skill
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {skillsList.map((s) => (
                    <div key={s.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:border-slate-300 transition">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-slate-800">{s.name}</p>
                          {s.proficiencyLevel && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700">
                              {s.proficiencyLevel}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">{s.category}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setItemModal({ open: true, type: 'skill', data: { ...s } })}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition"
                          title="Edit Skill"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSkill(s.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition"
                          title="Delete Skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Projects Showcase</h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setItemModal({
                          open: true,
                          type: 'project',
                          data: {
                            title: '',
                            description: '',
                            technologies: '',
                            githubUrl: '',
                            liveDemoUrl: '',
                            imageUrl: '',
                            featured: false,
                          },
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold cursor-pointer shadow-sm hover:bg-indigo-700 transition"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                    <a
                      href="/projects"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      Full Page <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  {projectsList.map((p) => (
                    <div key={p.id} className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start justify-between gap-3 hover:border-slate-300 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-800">{p.title}</h4>
                          {p.featured && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
                        {p.technologies && <p className="text-[11px] text-indigo-600 font-mono">{p.technologies}</p>}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setItemModal({ open: true, type: 'project', data: { ...p } })}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Live Real-Time Preview Panel */}
        <div className={`flex-1 bg-slate-900/50 p-4 sm:p-6 overflow-y-auto flex items-center justify-center ${previewMode === 'fullscreen' ? 'w-full' : ''}`}>
          <div
            className={`transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden border border-slate-800 bg-black ${
              deviceView === 'mobile'
                ? 'w-[375px] max-h-[750px] min-h-[600px] overflow-y-auto'
                : deviceView === 'tablet'
                ? 'w-[768px] max-h-[900px] min-h-[700px] overflow-y-auto'
                : 'w-full h-full overflow-y-auto'
            }`}
          >
            <TemplateRenderer
              portfolio={portfolioData}
              templateId={profileForm.templateId}
              themeColor={profileForm.themeColor}
              fontFamily={profileForm.fontFamily}
              onDownloadResume={() => alert('Resume download works in public view.')}
            />
          </div>
        </div>
      </div>

      {/* Add / Edit Skill Modal */}
      {itemModal.open && itemModal.type === 'skill' && (
        <Modal
          isOpen={itemModal.open}
          onClose={() => setItemModal({ open: false, type: null, data: null })}
          title={itemModal.data.id ? "Edit Technical Skill" : "Add Technical Skill"}
        >
          <form onSubmit={handleSaveSkill} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Skill Name *</label>
              <input
                type="text"
                required
                value={itemModal.data.name || ''}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, name: e.target.value } })}
                placeholder="e.g. Java 21, React, Spring Boot, Docker"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={itemModal.data.category || 'Programming Languages'}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, category: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              >
                <option value="Programming Languages">Programming Languages</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Databases">Databases</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Proficiency Level</label>
              <select
                value={itemModal.data.proficiencyLevel || 'Intermediate'}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, proficiencyLevel: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setItemModal({ open: false, type: null, data: null })}
                className="px-4 py-2 text-xs text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl shadow-sm hover:bg-indigo-700 transition">
                {itemModal.data.id ? "Save Changes" : "Add Skill"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add / Edit Experience Modal */}
      {itemModal.open && itemModal.type === 'experience' && (
        <Modal
          isOpen={itemModal.open}
          onClose={() => setItemModal({ open: false, type: null, data: null })}
          title={itemModal.data.id ? "Edit Experience / Role" : "Add Experience / Role"}
        >
          <form onSubmit={handleSaveExperience} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
              <input
                type="text"
                required
                value={itemModal.data.company || ''}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, company: e.target.value } })}
                placeholder="e.g. TechCorp Labs"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Job Title *</label>
              <input
                type="text"
                required
                value={itemModal.data.role || ''}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, role: e.target.value } })}
                placeholder="e.g. Software Engineer Intern"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                <input
                  type="text"
                  value={itemModal.data.startDate || ''}
                  onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, startDate: e.target.value } })}
                  placeholder="e.g. May 2025"
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                <input
                  type="text"
                  value={itemModal.data.endDate || ''}
                  onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, endDate: e.target.value } })}
                  placeholder="e.g. Aug 2025"
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Key Deliverables</label>
              <textarea
                rows={3}
                value={itemModal.data.description || ''}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, description: e.target.value } })}
                placeholder="What did you build? What technologies and results did you achieve?"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setItemModal({ open: false, type: null, data: null })}
                className="px-4 py-2 text-xs text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl shadow-sm hover:bg-indigo-700 transition">
                {itemModal.data.id ? "Save Changes" : "Add Experience"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add / Edit Project Modal */}
      {itemModal.open && itemModal.type === 'project' && (
        <Modal
          isOpen={itemModal.open}
          onClose={() => setItemModal({ open: false, type: null, data: null })}
          title={itemModal.data.id ? "Edit Project" : "Add Project"}
        >
          <form onSubmit={handleSaveProject} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={itemModal.data.title || ''}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, title: e.target.value } })}
                placeholder="e.g. AI-Powered Portfolio Builder"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
              <textarea
                rows={3}
                required
                value={itemModal.data.description || ''}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, description: e.target.value } })}
                placeholder="What does this application do? Outline key features..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Technologies Used</label>
              <input
                type="text"
                value={itemModal.data.technologies || ''}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, technologies: e.target.value } })}
                placeholder="e.g. React, Spring Boot, MySQL, Docker"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={itemModal.data.githubUrl || ''}
                  onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, githubUrl: e.target.value } })}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Live Demo URL</label>
                <input
                  type="url"
                  value={itemModal.data.liveDemoUrl || ''}
                  onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, liveDemoUrl: e.target.value } })}
                  placeholder="https://..."
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Image URL</label>
              <input
                type="url"
                value={itemModal.data.imageUrl || ''}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, imageUrl: e.target.value } })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="modalProjFeatured"
                checked={!!itemModal.data.featured}
                onChange={(e) => setItemModal({ ...itemModal, data: { ...itemModal.data, featured: e.target.checked } })}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="modalProjFeatured" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Mark as Featured Project
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setItemModal({ open: false, type: null, data: null })}
                className="px-4 py-2 text-xs text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl shadow-sm hover:bg-indigo-700 transition">
                {itemModal.data.id ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default BuilderPage;

