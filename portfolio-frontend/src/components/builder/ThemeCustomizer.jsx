import React from 'react';
import { THEME_COLORS, FONT_FAMILIES } from '../../templates/templatesData';
import { Check, Palette, Type } from 'lucide-react';

export const ThemeCustomizer = ({
  themeColor,
  fontFamily,
  onColorChange,
  onFontChange,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
      {/* Color Presets */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800">Accent Color Theme</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {THEME_COLORS.map((c) => {
            const isSelected = themeColor === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onColorChange(c.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: c.primary }}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Family Selection */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800">Typography & Font Pairing</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FONT_FAMILIES.map((f) => {
            const isSelected = fontFamily === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFontChange(f.id)}
                className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-base font-bold text-slate-900 ${f.styleClass}`}>
                    {f.name}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-600 stroke-[3]" />}
                </div>
                <p className="text-xs text-slate-500">{f.description}</p>
                <span className={`text-lg text-slate-400 mt-2 ${f.styleClass}`}>
                  Aa Bb Cc 123
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;

