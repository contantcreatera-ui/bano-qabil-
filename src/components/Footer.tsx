import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { OFFICIAL_CONTACT_INFO } from '../data/verifiedInfo';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-500/20">
                <GraduationCap className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight font-['Outfit']">
                  Bano<span className="text-emerald-400">Qabil</span>
                </span>
                <p className="text-[11px] text-emerald-400/90">Hyderabad Chapter</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              An Alkhidmat Foundation youth empowerment initiative delivering 100% free certified computer science and vocational digital skills education across Hyderabad, Sindh.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Official Hyderabad, Sindh Chapter
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  About Bano Qabil & Alkhidmat
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Admissions & Application
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Contact & Campus Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 text-slate-400"
                >
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Courses */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Official IT Courses</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home', 'courses')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'courses')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Mobile App Development (Flutter)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'courses')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Artificial Intelligence / Python
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'courses')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Digital Marketing & SEO
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'courses')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Graphic Designing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'courses')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Amazon Virtual Assistant / E-Commerce
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'courses')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Cybersecurity
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'courses')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Freelancing / IT Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contacts & Verification */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Hyderabad Headquarters</h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Regional Center:</strong> Alkhidmat Complex, Main Autobahn Road / Latifabad Unit 7, Hyderabad, Sindh
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>City Information Desk:</strong> Near Tilak Incline / Station Road, Hyderabad
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${OFFICIAL_CONTACT_INFO.generalEmail}`} className="hover:text-emerald-400 transition-colors">
                  {OFFICIAL_CONTACT_INFO.generalEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+923288888515" className="hover:text-emerald-400 transition-colors">
                  {OFFICIAL_CONTACT_INFO.generalHelpline}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-emerald-400/90 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                Official Bano Qabil Hyderabad admissions & aptitude screening program.
              </p>
            </div>
          </div>
        </div>

        {/* Official Channels & Social Links */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="font-medium text-slate-300">Official Links:</span>
            <a 
              href="https://www.banoqabil.pk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              banoqabil.pk <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://www.banoqabil.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              banoqabil.org <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://www.alkhidmat.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              alkhidmat.org <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenPrivacy}
              className="hover:text-emerald-400 transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={onOpenTerms}
              className="hover:text-emerald-400 transition-colors underline-offset-4 hover:underline"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

        {/* Official Foundation Notice & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500">
          <div className="space-y-1">
            <p className="font-semibold text-slate-300">
              Bano Qabil — Hyderabad Chapter | An Alkhidmat Foundation Initiative
            </p>
            <p>
              Empowering the youth of Hyderabad, Sindh through 100% free, certified modern information technology education.
            </p>
          </div>
          <div className="text-slate-400 flex items-center gap-1 text-[11px] shrink-0">
            © {new Date().getFullYear()} Bano Qabil Hyderabad. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
