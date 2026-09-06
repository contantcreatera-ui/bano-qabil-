import React, { useState } from 'react';
import { Menu, X, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string, param?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <div 
            id="site-logo"
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6 text-slate-950 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Outfit']">
                  Bano<span className="text-emerald-400">Qabil</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full tracking-wide uppercase">
                  Hyderabad Chapter
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-emerald-400/90 font-medium tracking-normal -mt-0.5">
                Free IT Training — Hyderabad, Sindh
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-emerald-400 bg-slate-800/80 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-admin-btn"
              onClick={() => handleNavClick('admin')}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
                activeTab === 'admin'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : 'text-slate-400 border-slate-700 hover:text-slate-200 hover:border-slate-600 bg-slate-800/40'
              }`}
              title="Applications Administration Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>

            <button
              id="nav-apply-btn"
              onClick={() => handleNavClick('admissions')}
              className="px-4.5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 text-sm font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all flex items-center gap-2 group"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              id="mobile-apply-btn"
              onClick={() => handleNavClick('admissions')}
              className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center flex items-center justify-center gap-2 shadow-md"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="mobile-admin-btn"
              onClick={() => handleNavClick('admin')}
              className="w-full py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white font-medium text-sm text-center flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
