import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Code2,
  FolderGit2,
  Award,
  FileText,
  Eye,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/skills', label: 'Skills', icon: Code2 },
  { path: '/projects', label: 'Projects', icon: FolderGit2 },
  { path: '/certifications', label: 'Certifications', icon: Award },
  { path: '/resume', label: 'Resume', icon: FileText },
  { path: '/preview', label: 'Portfolio Preview', icon: Eye },
];

export const Sidebar = ({ isCollapsed, onCloseMobile }) => {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <p className={`px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 ${isCollapsed ? 'text-center' : ''}`}>
          {isCollapsed ? '•••' : 'Management'}
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-indigo-600'
                } ${isCollapsed ? 'justify-center' : ''}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="flex-1">{item.label}</span>}
              {!isCollapsed && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:text-indigo-600" />
              )}
            </NavLink>
          );
        })}
      </div>

      {!isCollapsed && (
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/80">
          <p className="text-xs font-semibold text-indigo-950">Quick Tip</p>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
            Keep your projects and skills updated to increase portfolio completion.
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

