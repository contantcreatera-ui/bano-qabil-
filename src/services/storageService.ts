import { AdmissionFormData, ApplicationRecord } from '../types';

const STORAGE_KEY = 'bano_qabil_applications_hyd_v2';
const ADMIN_AUTH_KEY = 'bano_qabil_admin_auth';

const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'BQ-HYD-104218',
    fullName: 'Ahmed Raza',
    guardianName: 'Muhammad Tariq',
    dob: '2004-03-15',
    gender: 'Male',
    phone: '0301-2345678',
    email: 'ahmed.raza.hyd@example.com',
    cnic: '41302-1234567-1',
    city: 'Hyderabad',
    educationLevel: 'Intermediate (ICS)',
    preferredCourse: 'Web Development',
    preferredCampus: 'Hyderabad Main Campus (Latifabad)',
    address: 'Latifabad Unit 7, Hyderabad, Sindh',
    acceptedTerms: true,
    submittedAt: '2026-08-20T10:30:00.000Z',
    status: 'Verified',
    notes: 'Initial candidate record registered. Assigned to Latifabad Lab.'
  },
  {
    id: 'BQ-HYD-218934',
    fullName: 'Zainab Fatima',
    guardianName: 'Abdul Rehman',
    dob: '2003-07-22',
    gender: 'Female',
    phone: '0333-7654321',
    email: 'zainab.fatima.hyd@example.com',
    cnic: '41303-9876543-2',
    city: 'Hyderabad',
    educationLevel: 'Undergraduate',
    preferredCourse: 'Artificial Intelligence / Python',
    preferredCampus: 'Qasimabad Regional Training Center',
    address: 'Qasimabad Phase 1, Hyderabad, Sindh',
    acceptedTerms: true,
    submittedAt: '2026-08-22T14:15:00.000Z',
    status: 'Interview Scheduled',
    notes: 'Morning shift female lab slot. Pre-engineering background.'
  },
  {
    id: 'BQ-HYD-340156',
    fullName: 'Bilal Khan',
    guardianName: 'Rashid Khan',
    dob: '2005-11-04',
    gender: 'Male',
    phone: '0315-9871234',
    email: 'bilal.khan.hyd@example.com',
    cnic: '41304-5678901-3',
    city: 'Hyderabad',
    educationLevel: 'Intermediate',
    preferredCourse: 'Digital Marketing & SEO',
    preferredCampus: 'City Area IT Lab (Hyderabad)',
    address: 'Station Road, Hyderabad City, Sindh',
    acceptedTerms: true,
    submittedAt: '2026-08-24T16:45:00.000Z',
    status: 'Pending Review',
    notes: 'Awaiting intermediate mark sheet verification.'
  },
  {
    id: 'BQ-HYD-459203',
    fullName: 'Dua Memon',
    guardianName: 'Ghulam Mustafa',
    dob: '2004-09-19',
    gender: 'Female',
    phone: '0345-6789012',
    email: 'dua.memon.hyd@example.com',
    cnic: '41302-3456789-4',
    city: 'Hyderabad',
    educationLevel: 'Undergraduate',
    preferredCourse: 'Graphic Designing',
    preferredCampus: 'Auto Bhan Road Campus',
    address: 'Auto Bhan Road, Latifabad Unit 3, Hyderabad, Sindh',
    acceptedTerms: true,
    submittedAt: '2026-08-25T09:00:00.000Z',
    status: 'Pending Review',
    notes: 'Candidate documents verified.'
  }
];

export function getApplications(): ApplicationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading applications from localStorage:', err);
    return INITIAL_APPLICATIONS;
  }
}

export function saveApplication(formData: AdmissionFormData): { success: boolean; record?: ApplicationRecord; error?: string } {
  try {
    const existing = getApplications();
    
    // Normalize CNIC for comparison
    const cleanCnic = formData.cnic.replace(/\D/g, '');
    const cleanEmail = formData.email.trim().toLowerCase();

    // Check duplicate by CNIC (13 digits) or Email
    const isDuplicate = existing.some(app => {
      const existingCnicClean = app.cnic.replace(/\D/g, '');
      const existingEmailClean = app.email.trim().toLowerCase();
      return (cleanCnic.length >= 10 && existingCnicClean === cleanCnic) || 
             (cleanEmail.length > 3 && existingEmailClean === cleanEmail);
    });

    if (isDuplicate) {
      return {
        success: false,
        error: 'An application with this CNIC/B-Form or Email address has already been submitted to the Hyderabad Chapter registry.'
      };
    }

    // Generate roll reference code
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newId = `BQ-HYD-${randomSuffix}`;

    const newRecord: ApplicationRecord = {
      ...formData,
      id: newId,
      submittedAt: new Date().toISOString(),
      status: 'Pending Review'
    };

    const updatedList = [newRecord, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    return {
      success: true,
      record: newRecord
    };
  } catch (err: any) {
    console.error('Error saving application:', err);
    return {
      success: false,
      error: 'Failed to record application. Please ensure browser storage is enabled.'
    };
  }
}

export function deleteApplication(id: string): boolean {
  try {
    const existing = getApplications();
    const filtered = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Error deleting application:', err);
    return false;
  }
}

export function updateApplicationStatus(id: string, newStatus: ApplicationRecord['status']): boolean {
  try {
    const existing = getApplications();
    const updated = existing.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error updating status:', err);
    return false;
  }
}

export function updateApplicationNotes(id: string, notes: string): boolean {
  try {
    const existing = getApplications();
    const updated = existing.map(item => item.id === id ? { ...item, notes } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error updating application notes:', err);
    return false;
  }
}

export function resetApplications(): ApplicationRecord[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
    return INITIAL_APPLICATIONS;
  } catch (err) {
    console.error('Error resetting applications:', err);
    return INITIAL_APPLICATIONS;
  }
}

export function exportApplicationsToCSV(records: ApplicationRecord[]): void {
  const headers = [
    'Application Roll No',
    'Submission Date',
    'Full Name',
    'Guardian Name',
    'Gender',
    'DOB',
    'CNIC / B-Form',
    'Phone',
    'Email',
    'City',
    'Education Level',
    'Preferred Course',
    'Preferred Campus',
    'Status',
    'Residential Address',
    'Notes'
  ];

  const escapeCSV = (val: string | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = records.map(r => [
    escapeCSV(r.id),
    escapeCSV(new Date(r.submittedAt).toLocaleDateString()),
    escapeCSV(r.fullName),
    escapeCSV(r.guardianName),
    escapeCSV(r.gender),
    escapeCSV(r.dob),
    escapeCSV(r.cnic),
    escapeCSV(r.phone),
    escapeCSV(r.email),
    escapeCSV(r.city),
    escapeCSV(r.educationLevel),
    escapeCSV(r.preferredCourse),
    escapeCSV(r.preferredCampus),
    escapeCSV(r.status),
    escapeCSV(r.address),
    escapeCSV(r.notes || '')
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `bano_qabil_hyderabad_admissions_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Session authentication for local admin dashboard
export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function setAdminAuth(status: boolean): void {
  if (status) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
