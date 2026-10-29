import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  FileText,
  UploadCloud,
  Download,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Calendar,
  HardDrive,
  Info,
} from 'lucide-react';

export const ResumePage = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fileInputRef = useRef(null);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/resume');
      setResume(res.data?.data || null);
    } catch (err) {
      console.error('Error fetching resume', err);
      setErrorMsg('Failed to load resume details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so re-selecting same file fires change
    e.target.value = '';

    // Validate type
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMsg('Invalid file format. Only PDF files (.pdf) are permitted.');
      return;
    }

    // Validate size: 5MB = 5 * 1024 * 1024 = 5,242,880 bytes
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File exceeds 5MB size limit.');
      return;
    }

    setErrorMsg('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResume(res.data.data);
      setSuccessMsg(resume ? 'Resume replaced successfully!' : 'Resume uploaded successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error uploading resume', err);
      setErrorMsg(err.response?.data?.message || 'Failed to upload resume. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await api.get('/api/resume/download', {
        responseType: 'blob',
      });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', resume?.originalFileName || 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Error downloading resume', err);
      setErrorMsg('Failed to download resume.');
    }
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.delete('/api/resume');
      setResume(null);
      setIsDeleteDialogOpen(false);
      setSuccessMsg('Resume deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error deleting resume', err);
      setErrorMsg('Failed to delete resume.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  if (loading) {
    return <LoadingSpinner text="Checking resume status..." size="lg" />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resume Management</h1>
        <p className="text-sm text-slate-500 mt-1">
          Upload and manage your PDF resume. Visitors to your public portfolio can view or download it directly.
        </p>
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

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,application/pdf"
        className="hidden"
      />

      {/* Active Resume Card or Upload Dropzone */}
      {resume ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <FileCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Active Resume
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 break-all">
                  {resume.originalFileName}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                <RefreshCw className={`w-4 h-4 ${uploading ? 'animate-spin' : ''}`} />
                {uploading ? 'Replacing...' : 'Replace'}
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                title="Delete Resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <HardDrive className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">File Size</p>
                <p className="font-semibold text-slate-800">{formatFileSize(resume.fileSize)}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">Uploaded On</p>
                <p className="font-semibold text-slate-800">
                  {resume.uploadedAt ? new Date(resume.uploadedAt).toLocaleDateString() : 'Recent'}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <FileText className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">Format</p>
                <p className="font-semibold text-slate-800">Adobe PDF Document</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-white rounded-3xl p-10 text-center cursor-pointer transition group shadow-sm hover:shadow-md"
        >
          <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-50 group-hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition mb-4 shadow-inner">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
            {uploading ? 'Uploading your PDF resume...' : 'Upload your resume PDF'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click anywhere in this box to select a PDF file from your device.
          </p>
          <p className="text-[11px] text-slate-400 mt-3 font-medium">
            Accepted format: PDF only • Maximum file size: 5 MB
          </p>
        </div>
      )}

      {/* Helpful Guidelines Card */}
      <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2 text-xs text-indigo-950">
        <div className="flex items-center gap-2 font-bold text-indigo-900">
          <Info className="w-4 h-4 text-indigo-600" />
          Best Practices for Developer Resumes
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px] pl-1 leading-relaxed">
          <li>Ensure your GitHub URL, LinkedIn profile, and active email address are clearly visible at the top.</li>
          <li>Quantify achievements in project descriptions (e.g. "reduced query time by 40%", "serves 500+ requests/sec").</li>
          <li>Keep your document formatted cleanly in PDF format to ensure consistent layout across different recruiter screens.</li>
        </ul>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Resume"
        message="Are you sure you want to remove your resume? Visitors will no longer be able to download it from your public portfolio."
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default ResumePage;

