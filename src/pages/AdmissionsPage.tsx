import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Send, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  BookOpen, 
  Building2,
  Calendar,
  FileText,
  AlertCircle,
  Printer,
  ShieldCheck,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { saveApplication } from '../services/storageService';

interface FormData {
  fullName: string;
  fatherName: string;
  dob: string;
  gender: string;
  cnic: string;
  phone: string;
  email: string;
  address: string;
  education: string;
  course: string;
  campus: string;
  agreed: boolean;
}

interface AdmissionsPageProps {
  initialCourse?: string;
  onNavigateToAdmin?: () => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  initialCourse,
  onNavigateToAdmin,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const courses = [
    'Web Development',
    'Mobile App Development (Flutter)',
    'Artificial Intelligence / Python',
    'Digital Marketing & SEO',
    'Graphic Designing',
    'Amazon Virtual Assistant / E-Commerce',
    'Cybersecurity',
    'Freelancing / IT Essentials',
  ];

  const hyderabadCampuses = [
    'Hyderabad Main Campus (Latifabad)',
    'Qasimabad Regional Training Center',
    'City Area IT Lab (Hyderabad)',
    'Auto Bhan Road Campus',
  ];

  const initialFormState: FormData = {
    fullName: '',
    fatherName: '',
    dob: '',
    gender: 'Male',
    cnic: '',
    phone: '',
    email: '',
    address: '',
    education: 'Intermediate',
    course: initialCourse && courses.includes(initialCourse) ? initialCourse : 'Web Development',
    campus: 'Hyderabad Main Campus (Latifabad)',
    agreed: false,
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);

  // Sync initialCourse if passed from course modal/cards
  useEffect(() => {
    if (initialCourse && courses.includes(initialCourse)) {
      setFormData(prev => ({ ...prev, course: initialCourse }));
    }
  }, [initialCourse]);

  // Helper to format CNIC as XXXXX-XXXXXXX-X
  const formatCnic = (val: string) => {
    const numbers = val.replace(/\D/g, '').slice(0, 13);
    if (numbers.length <= 5) return numbers;
    if (numbers.length <= 12) return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 12)}-${numbers.slice(12, 13)}`;
  };

  // Helper to format Pakistani phone numbers
  const formatPhone = (val: string) => {
    const numbers = val.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 4) return numbers;
    return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Clear errors when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setGeneralError(null);

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'cnic') {
      setFormData(prev => ({ ...prev, cnic: formatCnic(value) }));
    } else if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errors.fullName = 'Please enter your full name (minimum 3 characters).';
    }

    if (!formData.fatherName.trim() || formData.fatherName.trim().length < 3) {
      errors.fatherName = "Please enter father's or guardian's name.";
    }

    if (!formData.dob) {
      errors.dob = 'Date of birth is required.';
    } else {
      const birthYear = new Date(formData.dob).getFullYear();
      const currentYear = new Date().getFullYear();
      if (birthYear > currentYear - 10 || birthYear < currentYear - 65) {
        errors.dob = 'Please provide a valid date of birth for eligibility (Ages 14-55).';
      }
    }

    const cleanCnic = formData.cnic.replace(/\D/g, '');
    if (!cleanCnic || cleanCnic.length !== 13) {
      errors.cnic = 'CNIC or B-Form must be exactly 13 digits (e.g. 41302-1234567-1).';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 11 || !cleanPhone.startsWith('03')) {
      errors.phone = 'Please provide a valid Pakistani mobile number starting with 03 (11 digits).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address (e.g. yourname@example.com).';
    }

    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errors.address = 'Please enter complete Hyderabad residential address.';
    }

    if (!formData.agreed) {
      errors.agreed = 'You must certify the details and agree to Bano Qabil academic terms.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      setGeneralError('Please correct the highlighted errors in the application form before submitting.');
      // Scroll to top of form smoothly
      const formEl = document.getElementById('admissions-form');
      formEl?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Save application into the local registry
      const saveResult = saveApplication({
        fullName: formData.fullName.trim(),
        guardianName: formData.fatherName.trim(),
        dob: formData.dob,
        gender: formData.gender === 'Female' ? 'Female' : 'Male',
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        cnic: formData.cnic.trim(),
        city: 'Hyderabad',
        educationLevel: formData.education,
        preferredCourse: formData.course,
        preferredCampus: formData.campus,
        address: formData.address.trim(),
        acceptedTerms: formData.agreed,
      });

      setLoading(false);

      if (!saveResult.success) {
        setGeneralError(saveResult.error || 'Submission could not be completed. Please review your details and try again.');
        return;
      }

      setAppId(saveResult.record?.id || `BQ-HYD-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
      setFieldErrors({});
    }, 800);
  };

  const handleResetForm = () => {
    setFormData(initialFormState);
    setSubmitted(false);
    setFieldErrors({});
    setGeneralError(null);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto my-12 px-4">
        <div className="p-8 sm:p-10 bg-slate-900 border border-emerald-500/40 rounded-3xl text-slate-100 shadow-2xl space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Application Submitted Successfully!
            </h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
              Your admission registration for <strong className="text-emerald-400">Bano Qabil Hyderabad</strong> has been recorded in the central student registry.
            </p>
          </div>

          {/* Admission Slip Preview */}
          <div className="p-6 sm:p-8 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-5 gap-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Alkhidmat Bano Qabil • Hyderabad Chapter
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit'] mt-1">
                  OFFICIAL ADMISSION REGISTRATION SLIP
                </h3>
                <p className="text-xs text-slate-400">100% Free IT Training & Vocational Scholarship</p>
              </div>
              <div className="sm:text-right bg-slate-900 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-slate-800 sm:border-0">
                <span className="text-xs text-slate-400 block">Candidate Roll No:</span>
                <p className="text-xl font-mono font-bold text-emerald-300 tracking-wide">{appId}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-slate-400 text-xs block">Candidate Full Name:</span>
                <span className="font-semibold text-white">{formData.fullName}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs block">Father / Guardian Name:</span>
                <span className="font-semibold text-white">{formData.fatherName}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs block">CNIC / B-Form:</span>
                <span className="font-mono font-semibold text-white">{formData.cnic}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs block">Phone / WhatsApp:</span>
                <span className="font-semibold text-white">{formData.phone}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs block">Selected IT Course:</span>
                <span className="font-bold text-emerald-300">{formData.course}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs block">Designated Hyderabad Campus:</span>
                <span className="font-semibold text-white">{formData.campus}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs block">Lab Batch Assignment:</span>
                <span className="font-semibold text-emerald-400">{formData.gender} Batch (Dedicated Shift)</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs block">Prior Education:</span>
                <span className="font-semibold text-white">{formData.education}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-1.5">
              <p className="font-bold text-slate-200">Next Steps & Aptitude Test Instructions:</p>
              <p>
                1. Please print or save this registration slip with your Roll Number <strong>{appId}</strong>.
              </p>
              <p>
                2. You will receive an SMS confirmation for the entry test venue and batch schedule at your assigned Hyderabad lab.
              </p>
              <p>
                3. Bring your original CNIC/B-Form and printed slip on the test date.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button 
              type="button"
              onClick={() => window.print()} 
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Printer className="w-5 h-5" />
              <span>Print Registration Slip</span>
            </button>
            
            <button 
              type="button"
              onClick={handleResetForm} 
              className="bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition cursor-pointer"
            >
              Submit Another Application
            </button>

            {onNavigateToAdmin && (
              <button
                type="button"
                onClick={onNavigateToAdmin}
                className="bg-slate-800/60 hover:bg-slate-800 text-emerald-400 font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>View in Registry</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs px-3.5 py-1 rounded-full uppercase tracking-wider font-bold inline-block">
          Official Intake 2026 • Hyderabad Chapter
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-['Outfit']">
          Student Admission Application
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Bano Qabil Hyderabad — 100% Free Certified IT Training & Vocational Empowerment Program
        </p>
      </div>

      {/* Main Form */}
      <form 
        id="admissions-form"
        onSubmit={handleSubmit} 
        noValidate
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl text-slate-100"
      >
        {/* Global Error Banner */}
        {generalError && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-semibold">Application Attention Required:</strong>
              <p className="text-xs text-red-200">{generalError}</p>
            </div>
          </div>
        )}

        {/* Section 1: Personal Details */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 font-['Outfit']">
            <User className="w-5 h-5" /> 1. Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                FULL NAME *
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. Muhammad Ali"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full bg-slate-800/90 border ${
                  fieldErrors.fullName ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-emerald-500'
                } rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors`}
              />
              {fieldErrors.fullName && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fieldErrors.fullName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                FATHER'S / GUARDIAN NAME *
              </label>
              <input
                type="text"
                name="fatherName"
                required
                placeholder="e.g. Abdul Razzaq"
                value={formData.fatherName}
                onChange={handleChange}
                className={`w-full bg-slate-800/90 border ${
                  fieldErrors.fatherName ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-emerald-500'
                } rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors`}
              />
              {fieldErrors.fatherName && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fieldErrors.fatherName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                DATE OF BIRTH *
              </label>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
                className={`w-full bg-slate-800/90 border ${
                  fieldErrors.dob ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-emerald-500'
                } rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors`}
              />
              {fieldErrors.dob && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fieldErrors.dob}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                GENDER * (SEPARATE LAB SESSIONS)
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Male">Male (Separate Lab Batch)</option>
                <option value="Female">Female (Separate Lab Batch)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                CNIC OR B-FORM NUMBER * (13 DIGITS)
              </label>
              <input
                type="text"
                name="cnic"
                required
                maxLength={15}
                placeholder="41302-1234567-1 (13 digits with dashes)"
                value={formData.cnic}
                onChange={handleChange}
                className={`w-full bg-slate-800/90 border ${
                  fieldErrors.cnic ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-emerald-500'
                } rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none transition-colors`}
              />
              {fieldErrors.cnic && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fieldErrors.cnic}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Contact Details */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 font-['Outfit']">
            <Phone className="w-5 h-5" /> 2. Contact Coordinates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                MOBILE / WHATSAPP NUMBER *
              </label>
              <input
                type="tel"
                name="phone"
                required
                maxLength={12}
                placeholder="0300-1234567"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-slate-800/90 border ${
                  fieldErrors.phone ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-emerald-500'
                } rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors`}
              />
              {fieldErrors.phone && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fieldErrors.phone}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="candidate@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-slate-800/90 border ${
                  fieldErrors.email ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-emerald-500'
                } rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors`}
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fieldErrors.email}</span>
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                HYDERABAD RESIDENTIAL ADDRESS *
              </label>
              <textarea
                name="address"
                required
                rows={2}
                placeholder="House / Flat No, Street, Area / Colony, Hyderabad, Sindh"
                value={formData.address}
                onChange={handleChange}
                className={`w-full bg-slate-800/90 border ${
                  fieldErrors.address ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-emerald-500'
                } rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors`}
              />
              {fieldErrors.address && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fieldErrors.address}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Course & Campus Selection */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 font-['Outfit']">
            <BookOpen className="w-5 h-5" /> 3. Course & Campus Track
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                HIGHEST EDUCATION *
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Matriculation">Matriculation (Science / Arts)</option>
                <option value="Intermediate">Intermediate (ICS / Pre-Eng / Pre-Med)</option>
                <option value="Undergraduate">Undergraduate (BS / BA / B.Com)</option>
                <option value="Graduate">Graduate / Masters Degree</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                DESIRED IT COURSE *
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {courses.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                PREFERRED HYDERABAD CAMPUS *
              </label>
              <select
                name="campus"
                value={formData.campus}
                onChange={handleChange}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {hyderabadCampuses.map((camp, i) => (
                  <option key={i} value={camp}>{camp}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Declaration Checkbox */}
        <div className={`flex items-start gap-3 bg-slate-800/50 p-4 rounded-2xl border ${
          fieldErrors.agreed ? 'border-red-500/50 bg-red-950/20' : 'border-slate-700/50'
        }`}>
          <input
            type="checkbox"
            name="agreed"
            id="agreed"
            required
            checked={formData.agreed}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-800 border-slate-600 cursor-pointer"
          />
          <div className="space-y-1">
            <label htmlFor="agreed" className="text-xs sm:text-sm text-slate-300 cursor-pointer block leading-relaxed">
              I certify that all details provided are accurate. I agree to comply with Bano Qabil Hyderabad's attendance regulations and academic codes of conduct.
            </label>
            <div className="flex items-center gap-3 text-xs text-emerald-400">
              {onOpenTerms && (
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:underline text-[11px]"
                >
                  View Terms & Rules
                </button>
              )}
              {onOpenPrivacy && (
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:underline text-[11px]"
                >
                  Privacy Policy
                </button>
              )}
            </div>
            {fieldErrors.agreed && (
              <p className="text-xs text-red-400 mt-1">{fieldErrors.agreed}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-base sm:text-lg py-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Verifying & Recording Application...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Admission Application</span>
            </>
          )}
        </button>

        {/* Footer info link */}
        {onNavigateToAdmin && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onNavigateToAdmin}
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Faculty or Registrar? Open Candidate Registry</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
