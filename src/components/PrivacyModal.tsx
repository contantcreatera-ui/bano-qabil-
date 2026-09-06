import React from 'react';
import { X, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl text-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              {type === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 id="modal-title" className="text-lg font-bold text-white font-['Outfit']">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <p className="text-xs text-slate-400">
                Bano Qabil Pakistan — Free IT Training Initiative
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Data Protection Commitment:</strong> Bano Qabil is committed to safeguarding candidate data. Applicant personal details, contact coordinates, and CNIC credentials are strictly processed for admission eligibility assessment, test scheduling, and program communications.
                </span>
              </div>

              <h4 className="text-base font-semibold text-white pt-2">1. Scope of Information Collected</h4>
              <p>
                To process student registration and verify eligibility, the admissions portal collects the candidate's full legal name, parent/guardian name, date of birth, mobile phone/WhatsApp contact, email address, CNIC/B-Form identifier, residential city and address, and desired IT course stream.
              </p>

              <h4 className="text-base font-semibold text-white pt-2">2. Use of Information</h4>
              <p>
                Collected information is used exclusively to evaluate candidate qualifications, schedule aptitude testing slots, issue official roll number slips, and organize batch rosters for physical computer lab sessions.
              </p>

              <h4 className="text-base font-semibold text-white pt-2">3. Data Confidentiality</h4>
              <p>
                Candidate records are never sold, traded, or shared with commercial advertising entities. Academic progress and certification status may be shared with partner hiring organizations strictly for employment placement opportunities upon graduation.
              </p>
            </>
          ) : (
            <>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Academic Code of Conduct:</strong> Bano Qabil provides 100% free IT scholarships to youth across Pakistan. Enrolled students agree to uphold academic integrity, maintain attendance standards, and respect laboratory facilities.
                </span>
              </div>

              <h4 className="text-base font-semibold text-white pt-2">1. Eligibility & Free Tuition</h4>
              <p>
                All Bano Qabil training courses are 100% tuition-free. Selection is strictly merit-based, determined by candidate screening test performance and interview evaluations across regional centers.
              </p>

              <h4 className="text-base font-semibold text-white pt-2">2. Attendance & Lab Guidelines</h4>
              <p>
                Admitted students must maintain a minimum attendance threshold of 80% throughout the 3-month course duration. Dedicated batch slots and physical computer labs are provided for male and female cohorts respectively.
              </p>

              <h4 className="text-base font-semibold text-white pt-2">3. Certification Requirements</h4>
              <p>
                Official completion certificates are conferred upon successful submission of required hands-on capstone projects, passing marks on the final practical evaluation, and regular class attendance.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
