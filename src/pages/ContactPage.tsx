import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  MessageSquare,
  Building,
  Clock
} from 'lucide-react';
import { OFFICIAL_CONTACT_INFO } from '../data/verifiedInfo';
import { ContactFormData } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'Course Information Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Course Information Inquiry',
        message: ''
      });
    }, 500);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Hyderabad Chapter — Inquiries & Campus Contacts</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Contact Bano Qabil Hyderabad
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Connect directly with Bano Qabil Hyderabad training centers, admissions desk, or submit an official inquiry.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Verified Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
                Send an Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Have questions regarding Hyderabad batches, course requirements, computer lab venues, or test schedules? Leave a message below.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-base text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Message Received
                </div>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Thank you! Your inquiry has been received. Our regional admissions coordinator will respond to your provided contact coordinates.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03xx-xxxxxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Inquiry Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none bg-white"
                    >
                      <option value="Course Information Inquiry">Course Information Inquiry</option>
                      <option value="Admission Eligibility Question">Admission Eligibility Question</option>
                      <option value="Hyderabad Campus Status">Hyderabad Campus Status</option>
                      <option value="General Program Inquiry">General Program Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your inquiry or question in detail..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-600">
                    Official queries are routed to regional administration.
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Verified Official Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Official Hyderabad Chapter Head Office */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                  Regional Headquarters
                </span>
                <h3 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-400" />
                  Bano Qabil — Hyderabad Chapter
                </h3>
              </div>

              {/* Main Office Latifabad */}
              <div className="space-y-2.5 text-xs border-b border-slate-800 pb-5">
                <div className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Regional Head Office:</strong>
                    {OFFICIAL_CONTACT_INFO.hyderabadChapter.address}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-300 pt-1">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Phone: {OFFICIAL_CONTACT_INFO.hyderabadChapter.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp: {OFFICIAL_CONTACT_INFO.hyderabadChapter.whatsapp}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Email: {OFFICIAL_CONTACT_INFO.hyderabadChapter.email}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 pt-1">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Office Hours: {OFFICIAL_CONTACT_INFO.hyderabadChapter.hours}</span>
                </div>
              </div>

              {/* Hyderabad Computer Training Centers */}
              <div className="space-y-2.5 text-xs border-b border-slate-800 pb-5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                  Hyderabad Training Venues & Labs
                </span>
                {OFFICIAL_CONTACT_INFO.hyderabadChapter.campuses.map((campus, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <p className="font-bold text-white text-xs">{campus.name}</p>
                    <p className="text-[11px] text-slate-300 mt-0.5">{campus.address}</p>
                  </div>
                ))}
              </div>

              {/* General Central Helpline */}
              <div className="space-y-1.5 text-xs">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                  Central Helpline & Alkhidmat Secretariat
                </span>
                <p className="text-slate-300">Toll-Free Helpline: {OFFICIAL_CONTACT_INFO.generalHelpline}</p>
                <p className="text-slate-400">{OFFICIAL_CONTACT_INFO.sindhSecretariat.address}</p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <a
                  href="https://www.banoqabil.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <span>banoqabil.pk</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://www.alkhidmat.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <span>alkhidmat.org</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Hyderabad, Sindh — Regional Headquarters & Campuses
              </h3>
              <p className="text-xs text-slate-600">
                Alkhidmat Bano Qabil main regional campus and computer lab network in Hyderabad, Sindh.
              </p>
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Hyderabad Chapter, Sindh
            </span>
          </div>

          {/* Embedded Google Map */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/8] sm:aspect-[21/9] bg-slate-100 shadow-inner">
            <iframe
              title="Bano Qabil Hyderabad Chapter Regional Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115340.5977934444!2d68.29175782012674!3d25.394998495047466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c70f6d444f3c3%3A0xc00bbc183d41e285!2sHyderabad%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            <div className="absolute bottom-3 left-3 bg-slate-950/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm border border-slate-700 shadow-md">
              Bano Qabil — Hyderabad Chapter, Sindh
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
