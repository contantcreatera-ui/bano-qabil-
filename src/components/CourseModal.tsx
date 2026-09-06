import React from 'react';
import { X, Clock, Award, CheckCircle, BookOpen, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { Course } from '../types';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onApply: (courseTitle: string) => void;
}

const DEFAULT_COURSE_FALLBACK = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onApply }) => {
  if (!course) return null;

  const curriculum = Array.isArray(course.curriculum) ? course.curriculum : [];
  const certifiedBy = Array.isArray(course.certifiedBy) ? course.certifiedBy : [];
  const tags = Array.isArray(course.tags) ? course.tags : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl text-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
      >
        {/* Header Image if available */}
        {course.image && (
          <div className="relative h-44 sm:h-52 w-full bg-slate-800 overflow-hidden shrink-0">
            <img 
              src={course.image} 
              alt={course.title || 'Course Details'} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = DEFAULT_COURSE_FALLBACK;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close course details"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
                  {course.category || 'IT Certification'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900/80 text-slate-300 border border-slate-700/80 backdrop-blur-sm">
                  100% Free Tuition
                </span>
                {course.level && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                    {course.level}
                  </span>
                )}
              </div>
              <h3 id="course-modal-title" className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] drop-shadow-md">
                {course.title || 'Certification Course'}
              </h3>
            </div>
          </div>
        )}

        {/* Fallback header if no image */}
        {!course.image && (
          <div className="p-6 border-b border-slate-800 bg-slate-900/90 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {course.category || 'IT Certification'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  100% Free Tuition
                </span>
              </div>
              <h3 id="course-modal-title" className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                {course.title || 'Certification Course'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close course details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Quick specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block">Training Duration</span>
                <span className="text-white font-semibold">{course.duration || '3 Months (In-Person Labs)'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 flex items-start gap-3">
              <Award className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block">Eligibility</span>
                <span className="text-white font-semibold">{course.eligibility || 'Matriculation or Intermediate'}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs border border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Course Description
            </h4>
            <p className="text-slate-300 leading-relaxed text-sm">
              {course.description || 'Comprehensive physical lab training provided in Hyderabad centers.'}
            </p>
          </div>

          {/* Prerequisites */}
          {course.prerequisites && (
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Prerequisites & Foundation
              </span>
              <p className="text-slate-300 text-xs">
                {course.prerequisites}
              </p>
            </div>
          )}

          {/* Syllabus / Curriculum */}
          {curriculum.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Key Curriculum Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {curriculum.map((topic, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-xs text-slate-300"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certification body */}
          <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Certification recognized under <strong>Alkhidmat Bano Qabil Initiative</strong> {certifiedBy.length > 0 ? `& ${certifiedBy.join(', ')}` : ''}
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Back to Courses
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(course.title);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <span>Apply for this Course</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
