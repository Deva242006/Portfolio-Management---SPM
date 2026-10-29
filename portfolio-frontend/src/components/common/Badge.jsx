import React from 'react';

const categoryColors = {
  'Programming Languages': 'bg-blue-50 text-blue-700 border-blue-200',
  'Frontend': 'bg-purple-50 text-purple-700 border-purple-200',
  'Backend': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Databases': 'bg-amber-50 text-amber-700 border-amber-200',
  'Tools': 'bg-rose-50 text-rose-700 border-rose-200',
  'default': 'bg-slate-100 text-slate-700 border-slate-200',
};

const levelColors = {
  'Beginner': 'bg-slate-100 text-slate-600',
  'Intermediate': 'bg-blue-100 text-blue-800',
  'Advanced': 'bg-indigo-100 text-indigo-800',
  'Expert': 'bg-emerald-100 text-emerald-800',
};

export const CategoryBadge = ({ category, className = '' }) => {
  const colorClass = categoryColors[category] || categoryColors.default;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} ${className}`}>
      {category}
    </span>
  );
};

export const LevelBadge = ({ level, className = '' }) => {
  const colorClass = levelColors[level] || 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${colorClass} ${className}`}>
      {level || 'Intermediate'}
    </span>
  );
};

export default CategoryBadge;

