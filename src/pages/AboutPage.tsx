import React from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  Sparkles, 
  Laptop, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Award,
  BookOpen
} from 'lucide-react';
import { LEADERSHIP_INFO, VERIFIED_STATISTICS } from '../data/verifiedInfo';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Alkhidmat Foundation — Hyderabad Chapter</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            About Bano Qabil Hyderabad
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Empowering the youth of Hyderabad and Sindh with modern, certified, and 100% free IT training to build thriving digital careers and global freelancing livelihoods.
          </p>
        </div>
      </section>

      {/* Origin & Foundation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              The Genesis
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
              Rooted in Social Welfare & Humanitarian Vision
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              <strong>Bano Qabil</strong> was founded as a visionary youth empowerment initiative by <strong>Alkhidmat Foundation Pakistan</strong>, one of the nation's most trusted non-profit humanitarian organizations. Recognized for disaster relief, healthcare, and education, Alkhidmat launched Bano Qabil in July 2022 to address the growing economic challenges facing young people in urban and suburban centers.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm">
              Rather than theoretical instruction, Bano Qabil was architected around practical, vocational computer training in specialized laboratories. By removing the financial barrier of tuition, the initiative unlocks technology education for talented students regardless of their socio-economic backgrounds.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Alkhidmat Information
              </div>
              <p>
                Alkhidmat Foundation operates certified computer laboratories across Sindh, Punjab, Khyber Pakhtunkhwa, and Islamabad, partnering with educational technology bodies and certified instructors.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-800 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold font-['Outfit'] text-white">
                  Patron-in-Chief Leadership
                </h3>

                <div className="space-y-2">
                  <div className="text-lg font-bold text-emerald-400">
                    {LEADERSHIP_INFO.name}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {LEADERSHIP_INFO.title}
                  </div>
                  <div className="text-xs text-slate-400">
                    Profession: {LEADERSHIP_INFO.profession}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  "{LEADERSHIP_INFO.roleDescription}"
                </p>

                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Public Verification Note:</span> Hafiz Naeem ur Rahman launched Bano Qabil in Karachi in July 2022. The program has subsequently expanded across major cities of Pakistan.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Mission Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                  Our Mission
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To democratize high-demand IT education for the youth of Pakistan through 100% free, lab-centered training programs that bridge the gap between academic education and modern industry skill requirements.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">Practical Skills</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">Financial Inclusion</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">Youth Employment</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                  Our Vision
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To transform Pakistan into a regional technology powerhouse by fostering a new generation of self-sufficient software developers, AI practitioners, digital marketers, and tech entrepreneurs capable of serving global markets.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700">Global Freelancing</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700">Self-Reliance</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700">National Economic Growth</span>
              </div>
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <Laptop className="w-8 h-8 text-emerald-600 mb-3" />
              <h4 className="text-base font-bold text-slate-900 font-['Outfit'] mb-1">
                Laboratory-First Training
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Courses emphasize keyboard time, live code debugging, and working software deployment over slide-based lectures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <Sparkles className="w-8 h-8 text-teal-600 mb-3" />
              <h4 className="text-base font-bold text-slate-900 font-['Outfit'] mb-1">
                Zero Financial Burden
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Funded by community philanthropists and Alkhidmat welfare networks, ensuring tuition is 100% free for students.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <Users className="w-8 h-8 text-emerald-600 mb-3" />
              <h4 className="text-base font-bold text-slate-900 font-['Outfit'] mb-1">
                Dedicated Gender Batches
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comfortable, respectful environments with dedicated lab slots and qualified female instructors for women in tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Focus: Hyderabad Chapter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Regional Operations
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              Bano Qabil Hyderabad Chapter Network
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Operating under the patronship of Alkhidmat Sindh, the Hyderabad Chapter delivers high-caliber vocational IT education through dedicated computer labs located across Latifabad, Qasimabad, and Hyderabad City.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <h4 className="font-bold text-slate-950 text-sm">Latifabad Main Center</h4>
              <p className="text-xs text-slate-700 mt-1">
                Autobahn / Unit 7 hub hosting high-spec computer laboratories for Web Development, Python AI, and Flutter Mobile App development.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">Qasimabad Campus</h4>
              <p className="text-xs text-slate-600 mt-1">
                Naseem Nagar / Citizen Colony labs specializing in Graphic Design, UI/UX, and Digital Marketing & SEO tracks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">Hyderabad City Center</h4>
              <p className="text-xs text-slate-600 mt-1">
                Station Road & Tilak Incline labs equipped for Amazon Virtual Assistant, Freelancing, and Cybersecurity fundamentals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">Kohsar & Jamshoro Labs</h4>
              <p className="text-xs text-slate-600 mt-1">
                Serving suburban students with modern systems, generator power backup, and dedicated female morning shifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit']">
            Apply for Bano Qabil Hyderabad Intake 2026
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Take the first step toward launching your IT career. Register online for our 100% free certified training courses at Hyderabad computer centers.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('admissions')}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Apply for Free Training</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-xl border border-slate-700 bg-slate-800 text-white font-semibold text-sm transition-all cursor-pointer"
            >
              <span>Contact Hyderabad Desk</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
