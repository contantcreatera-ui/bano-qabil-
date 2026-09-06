import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Users, 
  Sparkles, 
  Laptop, 
  ShieldCheck, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Play, 
  ExternalLink,
  Award,
  Building,
  Clock,
  HelpCircle,
  Briefcase,
  Code,
  Smartphone,
  Cpu,
  TrendingUp,
  Palette,
  ShoppingCart,
  Tag,
  Filter,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { VERIFIED_COURSES } from '../data/courses';
import { fetchCourses } from '../services/courseService';
import { VERIFIED_STATISTICS, VERIFIED_FAQS, ADMISSION_STEPS, LEADERSHIP_INFO } from '../data/verifiedInfo';
import { VERIFIED_GALLERY_ITEMS, VERIFIED_VIDEOS } from '../data/galleryData';
import { Course } from '../types';

interface HomePageProps {
  onNavigate: (tab: string, param?: string) => void;
  onSelectCourseForApply?: (courseTitle: string) => void;
  onApplyForCourse?: (courseTitle: string) => void;
  onViewCourseDetails?: (course: Course) => void;
  onSelectCourseForDetails?: (course: Course) => void;
}

const DEFAULT_COURSE_FALLBACK = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';

const getCourseIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Code':
      return <Code className="w-4 h-4 text-emerald-600" />;
    case 'Smartphone':
      return <Smartphone className="w-4 h-4 text-emerald-600" />;
    case 'Cpu':
      return <Cpu className="w-4 h-4 text-emerald-600" />;
    case 'TrendingUp':
      return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    case 'Palette':
      return <Palette className="w-4 h-4 text-emerald-600" />;
    case 'ShoppingCart':
      return <ShoppingCart className="w-4 h-4 text-emerald-600" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    case 'Briefcase':
      return <Briefcase className="w-4 h-4 text-emerald-600" />;
    default:
      return <BookOpen className="w-4 h-4 text-emerald-600" />;
  }
};

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onSelectCourseForApply,
  onApplyForCourse,
  onViewCourseDetails,
  onSelectCourseForDetails 
}) => {
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [selectedCourseCategory, setSelectedCourseCategory] = useState<string>('All');
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Async API course management state
  const [courses, setCourses] = useState<Course[]>(() => {
    // Initial safe hydration from verified data
    return Array.isArray(VERIFIED_COURSES) 
      ? VERIFIED_COURSES.filter(c => c.status === 'active' || !c.status) 
      : [];
  });
  const [coursesLoading, setCoursesLoading] = useState<boolean>(false);
  const [coursesError, setCoursesError] = useState<string | null>(null);
  const [coursesSource, setCoursesSource] = useState<'api' | 'fallback'>('fallback');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadCourses = async (forceRefresh = false) => {
    if (forceRefresh) {
      setIsRefreshing(true);
    } else {
      setCoursesLoading(true);
    }
    setCoursesError(null);

    try {
      const result = await fetchCourses({ forceRefresh });
      if (Array.isArray(result.courses)) {
        setCourses(result.courses);
        setCoursesSource(result.source);
        if (result.error && result.source === 'fallback') {
          setCoursesError(result.error);
        }
      }
    } catch (err: any) {
      setCoursesError(err?.message || 'Failed to connect to course API service');
    } finally {
      setCoursesLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadCourses(false);
  }, []);

  const handleApply = (courseTitle: string) => {
    if (typeof onSelectCourseForApply === 'function') {
      onSelectCourseForApply(courseTitle);
    } else if (typeof onApplyForCourse === 'function') {
      onApplyForCourse(courseTitle);
    } else {
      onNavigate('admissions', courseTitle);
    }
  };

  const handleViewDetails = (course: Course) => {
    if (typeof onViewCourseDetails === 'function') {
      onViewCourseDetails(course);
    } else if (typeof onSelectCourseForDetails === 'function') {
      onSelectCourseForDetails(course);
    }
  };

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const galleryCategories = ['All', 'Lab Sessions', 'Aptitude Tests', 'Workshops', 'Convocations'];

  const filteredGallery = selectedGalleryCategory === 'All'
    ? VERIFIED_GALLERY_ITEMS
    : VERIFIED_GALLERY_ITEMS.filter(item => item.category === selectedGalleryCategory);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Ambient subtle glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-500/10 via-teal-500/15 to-emerald-500/10 blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Alkhidmat Foundation — Hyderabad Chapter</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.12]">
                Empowering Youth <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300">
                  in Hyderabad, Sindh
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                100% Free Certified IT Training & Youth Empowerment Program
              </p>

              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Bano Qabil Hyderabad provides industry-standard, fully funded IT lab training across Latifabad, Qasimabad, and Hyderabad City to equip deserving youth with high-demand tech skills.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  id="hero-apply-btn"
                  onClick={() => onNavigate('admissions')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-explore-btn"
                  onClick={() => {
                    const el = document.getElementById('courses-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span>Explore Courses</span>
                </button>
              </div>

              {/* Verified Features Pills */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Free Tuition</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Certified 3-Month Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Separate Male & Female Batches</span>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-6 sm:p-7 shadow-2xl backdrop-blur-sm">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white font-['Outfit']">Admission Intake 2026</h3>
                        <p className="text-[11px] text-emerald-400">Sindh & Regional Batches</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                      Open Now
                    </span>
                  </div>

                  {/* Highlights list */}
                  <div className="py-5 space-y-3.5">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                      <Laptop className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-semibold text-white">Full Stack & App Development</p>
                        <p className="text-slate-400">React, Node.js, Flutter, and practical web architectures.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                      <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-semibold text-white">Bano Qabil 5.0 AI Tracks</p>
                        <p className="text-slate-400">Modern machine learning and cloud development modules.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                      <Briefcase className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-semibold text-white">Job Placement Support</p>
                        <p className="text-slate-400">Career fairs, freelance mentorship, and industry connect.</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action */}
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('admissions')}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm text-center shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Start Online Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-center text-slate-500 mt-2">
                      Instant online form submission & official verification slip
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED IMPACT & STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Verified Public Data
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-3">
              Official Numbers & Educational Scale
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              All statistics are transcribed strictly from verified Alkhidmat Foundation and Bano Qabil public releases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFIED_STATISTICS.map((stat) => (
              <div 
                key={stat.id}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] text-emerald-600">
                    {stat.value}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {stat.detail}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[10px] text-slate-600 italic">
                  Source: {stat.verifiedSource}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT BANO QABIL OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <Building className="w-3.5 h-3.5" />
              <span>Alkhidmat Foundation Initiative</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] leading-tight">
              Bridging the Digital Divide for Pakistani Youth
            </h2>

            <p className="text-slate-600 leading-relaxed text-base">
              Bano Qabil was initiated by <strong>Alkhidmat Foundation Pakistan</strong> under the leadership of Patron-in-Chief <strong>Hafiz Naeem ur Rahman</strong> (Central Ameer of Jamaat-e-Islami Pakistan and professional engineer) to address the pressing challenge of youth unemployment and limited access to modern vocational computer education.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm">
              Through modern physical computer laboratories, industry-vetted course outlines, and experienced instructors, the program empowers matric, intermediate, and university graduates to gain immediately monetizable skills in programming, artificial intelligence, e-commerce, and creative media.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Tuition Barrier</h4>
                  <p className="text-xs text-slate-600">Students pay zero tuition fees, ensuring that talent and dedication—not financial hardship—determine opportunity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Separate Batches for Male & Female Learners</h4>
                  <p className="text-xs text-slate-600">Conducted with tailored timing slots across campus laboratories to encourage inclusive female participation in tech.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Read Full About Us & Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 p-8 text-white border border-slate-700 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Patron-in-Chief & Founding Vision
                </span>

                <h3 className="text-2xl font-bold font-['Outfit'] text-white">
                  {LEADERSHIP_INFO.name}
                </h3>
                
                <p className="text-xs text-emerald-300 font-medium">
                  {LEADERSHIP_INFO.title}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed">
                  "{LEADERSHIP_INFO.roleDescription}"
                </p>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Verified Leadership Facts
                  </div>
                  <p className="text-slate-400">
                    Hafiz Naeem ur Rahman launched Bano Qabil in Karachi in July 2022 as a cornerstone youth empowerment initiative under Alkhidmat Foundation, which has now expanded into a nationwide network across Sindh, Punjab, and KP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE BANO QABIL */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Core Strengths
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] mt-3">
              Why Choose Bano Qabil
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Designed specifically to meet the high demands of the modern technology job market and global freelancing platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit']">
                Hands-on Lab Training
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Practical, lab-first teaching philosophy where every student spends scheduled hours coding and developing on dedicated computer workstations.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit']">
                Industry-Relevant Curriculum
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Modules designed in alignment with technology bodies including Cisco Academy, Google Career principles, and cloud architectures.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit']">
                Mentorship from Practitioners
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Courses are conducted by practicing software engineers, digital marketing executives, and experienced tech freelancers.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit']">
                BanoQabil Job & Career Support
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Graduates gain access to job fairs, startup incubators, and the official BanoQabil jobs network for employment assistance.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit']">
                Equitable & Merit-Based Access
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Selection is conducted transparently via aptitude screening and interviews, ensuring deserving youth receive prime opportunities.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit']">
                Regional Presence & Expansion
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                With roots in Karachi, Bano Qabil has extended to Lahore, Khyber Pakhtunkhwa, Islamabad, and regional chapters including Hyderabad, Sindh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. POPULAR IT COURSES */}
      <section id="courses-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {(() => {
          const safeCourses = Array.isArray(courses) 
            ? courses.filter(c => Boolean(c && c.id && (c.status === 'active' || !c.status))) 
            : [];
          const categories = ['All', ...Array.from(new Set(safeCourses.map(c => c.category).filter(Boolean)))];
          const filtered = safeCourses.filter(c => {
            if (!c) return false;
            if (selectedCourseCategory === 'All') return true;
            return c.category === selectedCourseCategory;
          });

          return (
            <div className="space-y-8">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                    Curriculum Catalog
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] mt-3">
                    Popular IT & Digital Courses
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    All courses are 100% free of tuition and conducted in physical labs in Hyderabad over 3 months.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap sm:justify-end">
                  {/* API Connection Indicator */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    <span 
                      className={`w-2 h-2 rounded-full ${
                        coursesSource === 'api' 
                          ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' 
                          : 'bg-amber-500'
                      }`} 
                    />
                    <span>{coursesSource === 'api' ? 'REST API' : 'Catalog Cache'}</span>
                  </span>

                  <span className="text-xs text-slate-600 font-medium bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/80">
                    Showing <strong>{filtered.length}</strong> of {safeCourses.length} Active Programs
                  </span>

                  {/* Refresh Button */}
                  <button
                    type="button"
                    onClick={() => loadCourses(true)}
                    disabled={isRefreshing || coursesLoading}
                    title="Refresh course data from API"
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center"
                    aria-label="Refresh course catalog"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
                  </button>

                  {selectedCourseCategory !== 'All' && (
                    <button
                      type="button"
                      onClick={() => setSelectedCourseCategory('All')}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer ml-1"
                    >
                      View All Courses
                    </button>
                  )}
                </div>
              </div>

              {/* API Notice / Error Banner (Graceful & Non-crashing) */}
              {coursesError && (
                <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>API Notice:</strong> Verified offline course catalog active ({coursesError}).
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => loadCourses(true)}
                    disabled={isRefreshing}
                    className="self-start sm:self-auto px-3 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Retry Connection
                  </button>
                </div>
              )}

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mr-2 shrink-0">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tracks:</span>
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCourseCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                      selectedCourseCategory === cat
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Loading Skeleton State */}
              {coursesLoading && courses.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((sk) => (
                    <div 
                      key={sk} 
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden animate-pulse flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-48 bg-slate-200 w-full" />
                        <div className="p-6 space-y-4">
                          <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
                          <div className="space-y-2">
                            <div className="h-3.5 bg-slate-100 rounded w-full" />
                            <div className="h-3.5 bg-slate-100 rounded w-5/6" />
                          </div>
                          <div className="pt-3 border-t border-slate-100 space-y-2">
                            <div className="h-3.5 bg-slate-100 rounded w-1/2" />
                            <div className="h-3.5 bg-slate-100 rounded w-2/3" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 pt-0 flex gap-2">
                        <div className="h-9 bg-slate-100 rounded-xl flex-1" />
                        <div className="h-9 bg-slate-200 rounded-xl flex-1" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">No Active Courses Found in This Category</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Please select a different track or reset to view all certified programs.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedCourseCategory('All')}
                    className="mt-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    View All Courses
                  </button>
                </div>
              ) : (
                /* Course Cards Grid with existing map() rendering */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((course) => (
                    <div 
                      key={course.id}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden group"
                    >
                      <div>
                        {/* Course Card Image Banner */}
                        <div className="relative h-48 w-full bg-slate-100 overflow-hidden shrink-0">
                          <img
                            src={course.image || DEFAULT_COURSE_FALLBACK}
                            alt={course.title || 'Bano Qabil Course'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = DEFAULT_COURSE_FALLBACK;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                          
                          {/* Badges on Image */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                              {course.category || 'IT Program'}
                            </span>
                            {course.popular && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 shadow-sm">
                                High Demand
                              </span>
                            )}
                          </div>

                          {/* Icon & Level at bottom of image */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <div className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md text-emerald-700 flex items-center justify-center shadow-md">
                              {getCourseIcon(course.icon)}
                            </div>
                            {course.level && (
                              <span className="text-[10px] font-semibold text-white/95 bg-slate-900/70 px-2.5 py-0.5 rounded-full border border-slate-700/60 backdrop-blur-sm">
                                {course.level}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 space-y-4">
                          <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] group-hover:text-emerald-700 transition-colors">
                            {course.title || 'Certification Course'}
                          </h3>

                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {course.description || 'Hands-on practical curriculum taught in physical laboratories.'}
                          </p>

                          {/* Tags */}
                          {Array.isArray(course.tags) && course.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {course.tags.slice(0, 4).map((tag, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Specs */}
                          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-slate-700">
                              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span><strong>Duration:</strong> {course.duration || '3 Months (In-Person Labs)'}</span>
                            </div>

                            <div className="flex items-start gap-2 text-slate-700">
                              <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-2"><strong>Eligibility:</strong> {course.eligibility || 'Matriculation or Intermediate'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-6 pt-0 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewDetails(course)}
                          className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          View Syllabus
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApply(course.title)}
                          className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </section>

      {/* 6. ADMISSION PROCESS (STEP BY STEP) */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 border border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Simple 5-Step Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] mt-3">
              Official Admission Process
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Transparent, merit-driven evaluation ensuring passionate students gain access to modern labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ADMISSION_STEPS.map((item) => (
              <div 
                key={item.step}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between relative group hover:border-emerald-400/60 transition-colors"
              >
                <div>
                  <span className="text-2xl font-extrabold text-emerald-400 font-['Outfit'] block mb-3">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 font-['Outfit']">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('admissions')}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/20 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. STUDENT SUCCESS STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Student Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] mt-3">
            Real Impact & Graduate Growth
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Thousands of young individuals across Pakistan have transitioned from beginners into earning tech professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-emerald-600">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "Learning full stack web development through physical lab sessions completely changed my trajectory. The mentorship on building Git repositories and real full-stack client apps helped me secure my first remote freelance contracts."
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <div className="font-bold text-slate-900 text-sm">Graduate Profile — Web Track</div>
              <div className="text-xs text-slate-600">Junior Frontend Developer & Freelancer</div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-emerald-600">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "Having a dedicated, female-only class timing with professional female instructors gave me the confidence to master Flutter mobile development. I published my first Android app within two months of graduation."
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <div className="font-bold text-slate-900 text-sm">Graduate Profile — Mobile App Track</div>
              <div className="text-xs text-slate-600">Cross-Platform App Builder</div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-emerald-600">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "The e-commerce and Amazon VA course taught us practical product research with actual industry software. It enabled our family to launch a certified digital agency helping local manufacturers export abroad."
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <div className="font-bold text-slate-900 text-sm">Graduate Profile — E-Commerce Track</div>
              <div className="text-xs text-slate-600">Amazon Marketplace Specialist</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REAL CLASSES & SESSIONS GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Curated Educational Media
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] mt-3">
              Real Classes & Lab Gallery
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Visual glimpses of Bano Qabil computer labs, aptitude test halls, and convocation events.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedGalleryCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.altText}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/70 text-white backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-600">
                  {item.sourceAttribution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. OFFICIAL VIDEO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                Official Video Broadcast
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
                Bano Qabil 5.0 Updates & Guidelines
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Watch the official update from Alkhidmat Karachi detailing class schedules, campus allocations, orientation days, and interview guidance for applicant cohorts.
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Channel: Alkhidmat Karachi Official</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Embed ID: s3B9pP97h9E</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={VERIFIED_VIDEOS[0].verifiedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
                >
                  <span>Open Video directly on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-2xl">
                {!videoPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800">
                    <button
                      onClick={() => setVideoPlaying(true)}
                      className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 hover:scale-110 transition-all cursor-pointer mb-4"
                      aria-label="Play official Bano Qabil update video"
                    >
                      <Play className="w-7 h-7 fill-slate-950 ml-1" />
                    </button>
                    <h3 className="text-base font-bold text-white font-['Outfit']">
                      Important Update for Bano Qabil 5.0 Applicants!
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Click to load official YouTube embed
                    </p>
                  </div>
                ) : (
                  <iframe
                    src={`${VERIFIED_VIDEOS[0].embedUrl}?autoplay=1`}
                    title="Bano Qabil Official Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LOCATION / MAP (HYDERABAD SINDH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Sindh Chapter Reference
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                Hyderabad, Sindh Chapter
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Bano Qabil has established its active presence in <strong>Hyderabad, Sindh</strong>, bringing premier digital skill training and physical computer laboratories to the second-largest educational hub of the province.
              </p>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  Sindh Regional Operations:
                </div>
                <p>
                  Alkhidmat Foundation Sindh coordinates testing centers, lab facilities, and orientation programs across regional venues in Hyderabad for registered students.
                </p>
              </div>

              <div className="text-xs text-slate-600 space-y-2 pt-2">
                <p>
                  Admitted students receive their specific batch timings, center locations, and lab schedules upon passing the screening test.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-slate-50 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Campus & Contact Info</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-100 shadow-inner">
                {/* Embedded Responsive Map */}
                <iframe
                  title="Hyderabad Sindh Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115340.5977934444!2d68.29175782012674!3d25.394998495047466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c70f6d444f3c3%3A0xc00bbc183d41e285!2sHyderabad%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm border border-slate-700 shadow-md">
                  Hyderabad, Sindh Chapter
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Verified answers about eligibility, course formats, lab arrangements, and the admission screening process.
          </p>
        </div>

        <div className="space-y-4">
          {VERIFIED_FAQS.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base font-['Outfit']">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. FINAL ADMISSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-400/30">
              Transform Your Future Today
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] text-white leading-tight">
              Ready to Master In-Demand IT Skills?
            </h2>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Join over 100,000+ applicants across Pakistan. Submit your registration online today, generate your official roll number and reference slip, and take the first step towards a rewarding tech career.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onNavigate('admissions')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-950 font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-5 h-5 text-emerald-600" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-800/40 hover:bg-emerald-800/60 text-white font-semibold text-base border border-emerald-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Learn About Alkhidmat</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
