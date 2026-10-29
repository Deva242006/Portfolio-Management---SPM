import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import LoadingSpinner from '../common/LoadingSpinner';

export const DashboardLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner text="Authenticating session..." size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        onToggleSidebar={() => {
          if (window.innerWidth < 1024) {
            setIsMobileOpen(!isMobileOpen);
          } else {
            setIsSidebarCollapsed(!isSidebarCollapsed);
          }
        }}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <div className="flex-1 flex">
        {/* Mobile backdrop */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <div className={`${isMobileOpen ? 'block' : 'hidden'} lg:block`}>
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onCloseMobile={() => setIsMobileOpen(false)}
          />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;

