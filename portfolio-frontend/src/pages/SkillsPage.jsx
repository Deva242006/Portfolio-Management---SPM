import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { CategoryBadge, LevelBadge } from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Plus, Edit2, Trash2, Code2, AlertCircle, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  'Programming Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Tools',
];

const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentSkillId, setCurrentSkillId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Programming Languages',
    proficiencyLevel: 'Intermediate',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Confirm Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/skills');
      setSkills(res.data?.data || []);
    } catch (err) {
      console.error('Error fetching skills', err);
      setErrorMsg('Failed to load skills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAddModal = () => {
    setModalMode('add');
    setCurrentSkillId(null);
    setFormData({
      name: '',
      category: activeTab !== 'All' ? activeTab : 'Programming Languages',
      proficiencyLevel: 'Intermediate',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setModalMode('edit');
    setCurrentSkillId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiencyLevel: skill.proficiencyLevel || 'Intermediate',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setFormSubmitting(true);
    setErrorMsg('');
    try {
      if (modalMode === 'add') {
        const res = await api.post('/api/skills', formData);
        setSkills((prev) => [...prev, res.data.data]);
        setSuccessMsg('Skill added successfully!');
      } else {
        const res = await api.put(`/api/skills/${currentSkillId}`, formData);
        setSkills((prev) =>
          prev.map((s) => (s.id === currentSkillId ? res.data.data : s))
        );
        setSuccessMsg('Skill updated successfully!');
      }
      setIsModalOpen(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error saving skill', err);
      setErrorMsg(err.response?.data?.message || 'Failed to save skill.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const promptDelete = (skill) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!skillToDelete) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/api/skills/${skillToDelete.id}`);
      setSkills((prev) => prev.filter((s) => s.id !== skillToDelete.id));
      setIsDeleteDialogOpen(false);
      setSkillToDelete(null);
      setSuccessMsg('Skill deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error deleting skill', err);
      setErrorMsg('Failed to delete skill.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredSkills =
    activeTab === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === activeTab.toLowerCase());

  if (loading) {
    return <LoadingSpinner text="Loading technical skills..." size="lg" />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Technical Skills</h1>
          <p className="text-sm text-slate-500 mt-1">
            Showcase your competencies in programming languages, frameworks, databases, and developer tools.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Skill
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

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeTab === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {cat}
            {cat === 'All' ? ` (${skills.length})` : ` (${skills.filter((s) => s.category.toLowerCase() === cat.toLowerCase()).length})`}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <EmptyState
          icon={Code2}
          title={activeTab === 'All' ? 'No Skills Added Yet' : `No ${activeTab} Skills Found`}
          description="Add technical skills with proficiency levels so prospective employers know your competencies."
          actionLabel="Add First Skill"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">
                    {skill.name}
                  </h3>
                  <LevelBadge level={skill.proficiencyLevel} />
                </div>
                <CategoryBadge category={skill.category} />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-slate-400">
                <button
                  type="button"
                  onClick={() => openEditModal(skill)}
                  className="p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                  title="Edit skill"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => promptDelete(skill)}
                  className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Delete skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Skill' : 'Edit Skill'}
        subtitle="Specify the skill name, category, and your self-assessed proficiency level."
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Java, React, Docker, Spring Boot"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Proficiency Level
            </label>
            <select
              value={formData.proficiencyLevel}
              onChange={(e) => setFormData({ ...formData, proficiencyLevel: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {PROFICIENCY_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
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
              {formSubmitting ? 'Saving...' : modalMode === 'add' ? 'Add Skill' : 'Update Skill'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Skill"
        message={`Are you sure you want to delete "${skillToDelete?.name}"? It will be removed from your public portfolio.`}
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSkillToDelete(null);
        }}
      />
    </div>
  );
};

export default SkillsPage;

