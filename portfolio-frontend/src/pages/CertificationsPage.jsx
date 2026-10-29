import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Calendar,
  Building,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const CertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentCertId, setCurrentCertId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    credentialUrl: '',
    credentialId: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [certToDelete, setCertToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/certifications');
      setCertifications(res.data?.data || []);
    } catch (err) {
      console.error('Error fetching certifications', err);
      setErrorMsg('Failed to load certifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const openAddModal = () => {
    setModalMode('add');
    setCurrentCertId(null);
    setFormData({
      name: '',
      issuingOrganization: '',
      issueDate: '',
      credentialUrl: '',
      credentialId: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cert) => {
    setModalMode('edit');
    setCurrentCertId(cert.id);
    setFormData({
      name: cert.name,
      issuingOrganization: cert.issuingOrganization,
      issueDate: cert.issueDate || '',
      credentialUrl: cert.credentialUrl || '',
      credentialId: cert.credentialId || '',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.issuingOrganization.trim()) return;

    setFormSubmitting(true);
    setErrorMsg('');

    try {
      if (modalMode === 'add') {
        const res = await api.post('/api/certifications', formData);
        setCertifications((prev) => [res.data.data, ...prev]);
        setSuccessMsg('Certification added successfully!');
      } else {
        const res = await api.put(`/api/certifications/${currentCertId}`, formData);
        setCertifications((prev) =>
          prev.map((c) => (c.id === currentCertId ? res.data.data : c))
        );
        setSuccessMsg('Certification updated successfully!');
      }
      setIsModalOpen(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error saving certification', err);
      setErrorMsg(err.response?.data?.message || 'Failed to save certification.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const promptDelete = (cert) => {
    setCertToDelete(cert);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!certToDelete) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/api/certifications/${certToDelete.id}`);
      setCertifications((prev) => prev.filter((c) => c.id !== certToDelete.id));
      setIsDeleteDialogOpen(false);
      setCertToDelete(null);
      setSuccessMsg('Certification deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error deleting certification', err);
      setErrorMsg('Failed to delete certification.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading certifications..." size="lg" />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Certifications & Licenses</h1>
          <p className="text-sm text-slate-500 mt-1">
            Display your industry recognized credentials, course completions, and cloud certifications.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Certification
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

      {/* Certifications Grid */}
      {certifications.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No Certifications Added"
          description="Add your AWS, Oracle, Google Cloud, Meta, or Coursera certifications to demonstrate validated expertise."
          actionLabel="Add Certification"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition">
                    <Award className="w-6 h-6" />
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 transition"
                      title="Verify Credential"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {cert.name}
                </h3>

                <div className="mt-2.5 space-y-1.5 text-xs text-slate-500">
                  <p className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {cert.issuingOrganization}
                  </p>
                  {cert.issueDate && (
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Issued: {cert.issueDate}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="font-mono text-[11px] text-slate-400">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-slate-400">
                <button
                  type="button"
                  onClick={() => openEditModal(cert)}
                  className="p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                  title="Edit certification"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => promptDelete(cert)}
                  className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Delete certification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Certification Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add Certification' : 'Edit Certification'}
        subtitle="Add your license, certification, or professional badge."
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Certification Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. AWS Certified Solutions Architect"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Issuing Organization *
            </label>
            <input
              type="text"
              required
              value={formData.issuingOrganization}
              onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}
              placeholder="e.g. Amazon Web Services, Oracle, Coursera"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issue Date
              </label>
              <input
                type="text"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                placeholder="e.g. August 2025"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Credential ID
              </label>
              <input
                type="text"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                placeholder="e.g. ABC-1234567"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Credential Verification URL
            </label>
            <input
              type="url"
              value={formData.credentialUrl}
              onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
              placeholder="https://www.credly.com/badges/..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
              {formSubmitting ? 'Saving...' : modalMode === 'add' ? 'Add Certification' : 'Update Certification'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Certification"
        message={`Are you sure you want to delete "${certToDelete?.name}"?`}
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setCertToDelete(null);
        }}
      />
    </div>
  );
};

export default CertificationsPage;

