import React from 'react';
import { Plus } from 'lucide-react';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm">
      {Icon && (
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm hover:shadow active:scale-95"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

