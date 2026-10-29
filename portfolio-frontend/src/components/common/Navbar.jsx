import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  Bell,
  Globe,
  LogOut,
  User as UserIcon,
  ChevronDown,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const publicUrl = user?.username ? `/u/${user.username}` : '#';

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent hidden sm:inline">
              Portfolio<span className="text-indigo-600">Hub</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Public Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border bg-slate-50">
            <span className={`w-2 h-2 rounded-full ${user?.isPublished ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-600">
              {user?.isPublished ? 'Portfolio Live' : 'Draft / Unpublished'}
            </span>
          </div>

          {/* Quick link to view public page */}
          {user?.isPublished && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition border border-indigo-200/50"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Site</span>
              <ExternalLink className="w-3 h-3 text-indigo-400" />
            </a>
          )}

          {/* Notifications area */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setDropdownOpen(false);
              }}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-4 z-40 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-900">Notifications</h4>
                  <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">New</span>
                </div>
                <div className="py-3 text-xs text-slate-600 space-y-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="font-medium text-slate-800">Welcome to PortfolioHub!</p>
                    <p className="text-slate-500 mt-0.5">Complete your profile, add skills, and publish your personal portfolio.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User profile dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setNotificationOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition"
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName || user.username}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-semibold flex items-center justify-center text-xs shadow-sm">
                  {(user?.fullName || user?.username || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left hidden md:block">
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  {user?.fullName || user?.username}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight">@{user?.username}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-40 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-800">{user?.fullName || user?.username}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                >
                  <UserIcon className="w-4 h-4" />
                  Edit Profile
                </Link>

                <Link
                  to="/preview"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                >
                  <Globe className="w-4 h-4" />
                  Portfolio Preview
                </Link>

                <div className="border-t border-slate-100 my-1" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

