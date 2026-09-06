export interface Course {
  id: string;
  title: string;
  category: 
    | 'Software Engineering' 
    | 'Data & AI' 
    | 'Marketing & Business' 
    | 'Design & Media' 
    | 'Cybersecurity'
    | 'Web & Software'
    | 'Mobile Engineering'
    | 'Marketing & Growth'
    | 'Creative & UI Design'
    | 'E-Commerce & Trade'
    | 'Security & Infrastructure'
    | 'Career & Freelancing'
    | string;
  description: string;
  duration: string; // "3 Months (Hands-on Labs)"
  eligibility: string;
  prerequisites: string;
  curriculum: string[];
  certifiedBy: string[];
  popular?: boolean;
  featured?: boolean;
  image?: string;
  icon?: string;
  level?: string;
  tags?: string[];
  status?: 'active' | 'inactive' | 'upcoming' | 'closed' | string;
}

export type Gender = 'Male' | 'Female';

export interface AdmissionFormData {
  fullName: string;
  guardianName: string;
  dob: string;
  gender: Gender;
  phone: string;
  email: string;
  cnic: string;
  city: string;
  educationLevel: string;
  preferredCourse: string;
  preferredCampus: string;
  address: string;
  guardianContact?: string;
  acceptedTerms: boolean;
}

export interface ApplicationRecord extends AdmissionFormData {
  id: string; // e.g. BQ-HYD-849201
  submittedAt: string;
  status: 'Pending Review' | 'Verified' | 'Interview Scheduled' | 'Enrolled' | 'Rejected';
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Admissions' | 'Courses' | 'Eligibility' | 'Campuses' | 'Curriculum';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Lab Sessions' | 'Aptitude Tests' | 'Convocations' | 'Workshops';
  description: string;
  imageUrl: string;
  sourceAttribution: string;
  altText: string;
}

export interface VerifiedStatistic {
  id: string;
  label: string;
  value: string;
  verifiedSource: string;
  detail: string;
}
