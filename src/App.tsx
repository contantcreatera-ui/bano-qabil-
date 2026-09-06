import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { CourseModal } from './components/CourseModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { Course } from './types';
import { VERIFIED_COURSES } from './data/courses';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | null>(null);
  const [admissionsCourse, setAdmissionsCourse] = useState<string | undefined>(undefined);

  // Sync title dynamically
  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Bano Qabil — Free IT Training & Youth Empowerment',
      about: 'About Bano Qabil & Alkhidmat Foundation',
      admissions: 'Student Admissions Application — Bano Qabil',
      contact: 'Contact & Official Inquiries — Bano Qabil',
      admin: 'Admin Portal — Applications Management',
    };
    document.title = titles[currentTab] || 'Bano Qabil — Free IT Training & Youth Empowerment';
  }, [currentTab]);

  const handleNavigate = (tab: string, param?: string) => {
    setCurrentTab(tab);

    if (tab === 'admissions' && param) {
      setAdmissionsCourse(param);
    }

    if (tab === 'home' && param === 'courses') {
      setTimeout(() => {
        const el = document.getElementById('courses-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyCourse = (courseTitle: string) => {
    setSelectedCourseForModal(null);
    setAdmissionsCourse(courseTitle);
    setCurrentTab('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCourseDetails = (course: Course) => {
    setSelectedCourseForModal(course);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Inter',sans-serif] selection:bg-emerald-500 selection:text-white">
      {/* Main Header & Navigation */}
      <Navbar activeTab={currentTab} onNavigate={handleNavigate} />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onViewCourseDetails={handleViewCourseDetails}
            onSelectCourseForDetails={handleViewCourseDetails}
            onSelectCourseForApply={handleApplyCourse}
            onApplyForCourse={handleApplyCourse}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'admissions' && (
          <AdmissionsPage
            initialCourse={admissionsCourse}
            onNavigateToAdmin={() => handleNavigate('admin')}
            onOpenTerms={() => setActivePolicyModal('terms')}
            onOpenPrivacy={() => setActivePolicyModal('privacy')}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}

        {currentTab === 'admin' && (
          <AdminPage onNavigateToAdmissions={() => handleNavigate('admissions')} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setActivePolicyModal('privacy')}
        onOpenTerms={() => setActivePolicyModal('terms')}
      />

      {/* Course Details Modal */}
      <CourseModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onApply={handleApplyCourse}
      />

      {/* Privacy Policy & Terms Modal */}
      <PrivacyModal
        type={activePolicyModal}
        onClose={() => setActivePolicyModal(null)}
      />
    </div>
  );
}
