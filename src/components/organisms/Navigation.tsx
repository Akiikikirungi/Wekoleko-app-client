import React, { useState } from 'react';
import { Home, PlusCircle, ClipboardList, User, Menu, X, Zap, LogOut } from 'lucide-react';

const ModernNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: ClipboardList, href: '/dashboard' },
    { id: 'new', label: 'New', icon: PlusCircle, href: '/new' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' }
  ];

  return (
    <>
      {/* Desktop/Tablet Top Nav */}
      <nav className="hidden md:block bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Wekoleko
              </span>
            </div>

            {/* Desktop Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeTab === item.id
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              
              <div className="w-px h-8 bg-slate-200 mx-2" />
              
              <button className="px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Wekoleko
            </span>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3 ${
                    activeTab === item.id
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              
              <div className="pt-2 mt-2 border-t border-slate-200">
                <button className="w-full px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-lg">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-slate-600'
              }`}
            >
              <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content Area */}
      <div className="p-6 max-w-7xl mx-auto mb-20 md:mb-0">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Current Page: {navItems.find(item => item.id === activeTab)?.label}
          </h2>
          <p className="text-slate-600 mb-6">
            This navigation component adapts to mobile and desktop screens. On mobile, you'll see:
          </p>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span>A collapsible top menu for additional options</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span>A bottom tab bar for quick navigation between main sections</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span>Visual feedback showing which page is currently active</span>
            </li>
          </ul>

          <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-2">Mobile-First Design</h3>
            <p className="text-orange-800 text-sm">
              This navigation prioritizes mobile users with thumb-friendly bottom tabs and a clean, uncluttered interface that works perfectly on any screen size.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernNavigation;