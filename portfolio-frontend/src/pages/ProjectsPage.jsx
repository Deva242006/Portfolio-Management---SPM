import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  Image,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Github } from '../components/common/Icons';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveDemoUrl: '',
    imageUrl: '',
    featured: false,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Confirm Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/projects');
      setProjects(res.data?.data || []);
    } catch (err) {
      console.error('Error fetching projects', err);
      setErrorMsg('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setModalMode('add');
    setCurrentProjectId(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveDemoUrl: '',
      imageUrl: '',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    setModalMode('edit');
    setCurrentProjectId(proj.id);
    setFormData({
      title: proj.title,
      description: proj.description || '',
      technologies: proj.technologies || '',
      githubUrl: proj.githubUrl || '',
      liveDemoUrl: proj.liveDemoUrl || '',
      imageUrl: proj.imageUrl || '',
      featured: proj.featured || false,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setFormSubmitting(true);
    setErrorMsg('');

    try {
      if (modalMode === 'add') {
        const res = await api.post('/api/projects', formData);
        setProjects((prev) => [res.data.data, ...prev]);
        setSuccessMsg('Project added successfully!');
      } else {
        const res = await api.put(`/api/projects/${currentProjectId}`, formData);
        setProjects((prev) =>
          prev.map((p) => (p.id === currentProjectId ? res.data.data : p))
        );
        setSuccessMsg('Project updated successfully!');
      }
      setIsModalOpen(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error saving project', err);
      setErrorMsg(err.response?.data?.message || 'Failed to save project.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const promptDelete = (proj) => {
    setProjectToDelete(proj);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/api/projects/${projectToDelete.id}`);
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
      setSuccessMsg('Project deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error deleting project', err);
      setErrorMsg('Failed to delete project.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading projects..." size="lg" />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Project Portfolio</h1>
          <p className="text-sm text-slate-500 mt-1">
            Highlight your best applications, GitHub repositories, and live deployed software.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No Projects Added Yet"
          description="Build out your portfolio by adding your capstone, side projects, open-source work, and web apps."
          actionLabel="Add First Project"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-indigo-200 transition group"
            >
              <div>
                {/* Image Banner */}
                {proj.imageUrl ? (
                  <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {proj.featured && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                        <Star className="w-3 h-3 fill-white" /> Featured
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="h-28 bg-gradient-to-r from-slate-100 to-indigo-50/50 flex items-center justify-between px-6 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    {proj.featured && (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
                      </span>
                    )}
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {proj.description || 'No description provided.'}
                  </p>

                  {/* Technologies tags */}
                  {proj.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 transition"
                      title="View GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {proj.liveDemoUrl && (
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition ml-2"
                      title="View Live Application"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition"
                    title="Edit project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => promptDelete(proj)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Project' : 'Edit Project'}
        subtitle="Share the details, tech stack, and links of your project."
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. PortfolioHub Full Stack Management System"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What problem does this project solve? What architecture did you use?"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Technologies Used (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="e.g. React, Spring Boot, MySQL, Tailwind CSS, JWT"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/user/project"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Live Demo URL
              </label>
              <input
                type="url"
                value={formData.liveDemoUrl}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                placeholder="https://myproject.demo.app"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project Screenshot Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/screenshot.png"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <label htmlFor="featured" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Mark as Featured Project (pinned at top of public portfolio)
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {formSubmitting ? 'Saving...' : modalMode === 'add' ? 'Add Project' : 'Update Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"? This cannot be undone.`}
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setProjectToDelete(null);
        }}
      />
    </div>
  );
};

export default ProjectsPage;
