import React, { useState } from 'react';
import { TEMPLATES } from '../../templates/templatesData';
import { Check, Eye, Sparkles } from 'lucide-react';

export const TemplateSelector = ({ selectedTemplateId, onSelectTemplate, onPreviewTemplate }) => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Minimal', 'Developer', 'Creative', 'Student', 'Executive', 'Modern'];

  const filtered =
    filter === 'All'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              filter === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => {
          const isSelected = selectedTemplateId === t.id;
          return (
            <div
              key={t.id}
              onClick={() => onSelectTemplate(t.id)}
              className={`rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between group relative ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 shadow-md ring-2 ring-indigo-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.accent }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.category}
                  </span>
                  {t.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 ml-auto mr-7">
                      {t.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {t.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.tagline}
                </p>

                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Includes:</p>
                  <ul className="text-[11px] text-slate-600 space-y-1">
                    {t.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  {isSelected ? 'Currently Applied' : 'Click to select'}
                </span>

                {onPreviewTemplate && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreviewTemplate(t);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 p-1 rounded transition"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;

