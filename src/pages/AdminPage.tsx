import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  GraduationCap,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText
} from 'lucide-react';
import { ApplicationRecord } from '../types';
import { 
  getApplications, 
  deleteApplication, 
  updateApplicationStatus, 
  updateApplicationNotes,
  resetApplications, 
  exportApplicationsToCSV,
  isAdminAuthenticated,
  setAdminAuth
} from '../services/storageService';
import { VERIFIED_COURSES } from '../data/courses';

interface AdminPageProps {
  onNavigateToAdmissions: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigateToAdmissions }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  const [viewingRecord, setViewingRecord] = useState<ApplicationRecord | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [exportFeedback, setExportFeedback] = useState<boolean>(false);

  // Check auth state on mount
  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
    loadRecords();
  }, []);

  const loadRecords = () => {
    const list = getApplications();
    setApplications(list);
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Grant session authentication for administrative registrar workspace
    setAdminAuth(true);
    setIsAuthenticated(true);
    setAuthError(null);
    loadRecords();
  };

  const handleLogout = () => {
    setAdminAuth(false);
    setIsAuthenticated(false);
    setPasscodeInput('');
  };

  const handleDelete = (id: string) => {
    deleteApplication(id);
    setDeleteConfirmId(null);
    if (viewingRecord?.id === id) {
      setViewingRecord(null);
    }
    loadRecords();
  };

  const handleStatusChange = (id: string, newStatus: ApplicationRecord['status']) => {
    updateApplicationStatus(id, newStatus);
    loadRecords();
    if (viewingRecord && viewingRecord.id === id) {
      setViewingRecord(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleSaveNotes = (id: string) => {
    updateApplicationNotes(id, editingNotes);
    loadRecords();
    if (viewingRecord && viewingRecord.id === id) {
      setViewingRecord(prev => prev ? { ...prev, notes: editingNotes } : null);
    }
  };

  const handleResetData = () => {
    const reset = resetApplications();
    setApplications(reset);
    setViewingRecord(null);
    setShowResetModal(false);
  };

  const handleExportCSV = () => {
    exportApplicationsToCSV(filteredApplications);
    setExportFeedback(true);
    setTimeout(() => setExportFeedback(false), 3000);
  };

  // Filter logic
  const filteredApplications = applications.filter(app => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      app.fullName.toLowerCase().includes(query) ||
      app.cnic.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query) ||
      app.phone.toLowerCase().includes(query) ||
      app.id.toLowerCase().includes(query);

    const matchesCourse = selectedCourseFilter === 'All' || app.preferredCourse === selectedCourseFilter;
    const matchesStatus = selectedStatusFilter === 'All' || app.status === selectedStatusFilter;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  // If not logged in, render Admin Gateway
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-950/20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 sm:p-10 max-w-md w-full space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
              Hyderabad Chapter • Registrar
            </span>
            <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">
              Admissions Registry Portal
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Administrative workspace for reviewing, filtering, status verification, and CSV export of local candidate admission records.
            </p>
          </div>

          <form onSubmit={handleAccessSubmit} className="space-y-4 pt-2">
            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Client-Side Registrar Workspace</span>
              </p>
              <p className="text-[11px] text-slate-500 leading-normal">
                Student applications synchronize with the browser's local application database. No external server credentials or environment variables are required.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Access Registrar Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onNavigateToAdmissions}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Admissions Form</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
              Registrar Management Desk
            </span>
            <span className="text-xs text-slate-500">Hyderabad Chapter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] mt-1">
            Student Admissions Registry
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Review student applications, update verification statuses, filter by course track, and export CSV logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToAdmissions}
            className="px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Open Admission Form</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock Session</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Registered</p>
            <p className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
              {applications.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Pending Review</p>
            <p className="text-2xl font-black text-amber-600 font-['Outfit'] mt-1">
              {applications.filter(a => a.status === 'Pending Review').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Verified / Ready</p>
            <p className="text-2xl font-black text-emerald-600 font-['Outfit'] mt-1">
              {applications.filter(a => a.status === 'Verified').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Interview / Enrolled</p>
            <p className="text-2xl font-black text-teal-600 font-['Outfit'] mt-1">
              {applications.filter(a => a.status === 'Interview Scheduled' || a.status === 'Enrolled').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, Export */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, CNIC, roll no, or phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Download filtered records as CSV spreadsheet"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{exportFeedback ? 'CSV Downloaded!' : 'Export CSV'}</span>
            </button>

            <button
              onClick={() => setShowResetModal(true)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset records to default sample list"
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
              <span>Reset Database</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filters:</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Course:</span>
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All 8 Courses</option>
              {VERIFIED_COURSES.map(c => (
                <option key={c.id} value={c.title}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Status:</span>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Verified">Verified</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {(selectedCourseFilter !== 'All' || selectedStatusFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCourseFilter('All');
                setSelectedStatusFilter('All');
                setSearchQuery('');
              }}
              className="text-emerald-700 font-bold hover:underline cursor-pointer ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">No Matching Applications Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No applicant records matched your search query or filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Roll No</th>
                  <th className="py-3.5 px-4">Applicant Name</th>
                  <th className="py-3.5 px-4">CNIC / B-Form</th>
                  <th className="py-3.5 px-4">Preferred Course</th>
                  <th className="py-3.5 px-4">Campus</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                      {app.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{app.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{app.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {app.cnic}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 line-clamp-1">{app.preferredCourse}</div>
                      <div className="text-[10px] text-slate-500">{app.gender} Batch</div>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-600">
                      {app.preferredCampus}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        app.status === 'Verified' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        app.status === 'Interview Scheduled' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                        app.status === 'Enrolled' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                        app.status === 'Rejected' ? 'bg-red-50 text-red-800 border-red-200' :
                        'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setViewingRecord(app);
                            setEditingNotes(app.notes || '');
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                          title="View Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(app.id)}
                          className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Delete Application?</h3>
              <p className="text-xs text-slate-600">
                Are you sure you want to delete application roll <strong>{deleteConfirmId}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Reset Applications Database?</h3>
              <p className="text-xs text-slate-600">
                This will reset local application storage to the initial default candidate list.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetData}
                className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Database
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Application Details Modal */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-slate-800 text-xs">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    {viewingRecord.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    viewingRecord.status === 'Verified' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                    viewingRecord.status === 'Interview Scheduled' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                    viewingRecord.status === 'Enrolled' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                    viewingRecord.status === 'Rejected' ? 'bg-red-50 text-red-800 border-red-200' :
                    'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {viewingRecord.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mt-1">
                  {viewingRecord.fullName}
                </h3>
              </div>

              <button
                onClick={() => setViewingRecord(null)}
                className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-200/60 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Personal Details */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-500 mb-3">
                  Applicant Profile
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Father / Guardian:</span>
                    <strong className="text-slate-800">{viewingRecord.guardianName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CNIC / B-Form:</span>
                    <strong className="text-slate-800 font-mono">{viewingRecord.cnic}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Gender Batch:</span>
                    <strong className="text-slate-800">{viewingRecord.gender} Batch</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Date of Birth:</span>
                    <strong className="text-slate-800">{viewingRecord.dob}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Education:</span>
                    <strong className="text-slate-800">{viewingRecord.educationLevel}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">City:</span>
                    <strong className="text-slate-800">{viewingRecord.city}</strong>
                  </div>
                </div>
              </div>

              {/* Course & Campus */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-500 mb-3">
                  Selected Program
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Desired Course:</span>
                    <strong className="text-emerald-700 text-sm">{viewingRecord.preferredCourse}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Assigned Campus:</span>
                    <strong className="text-slate-800">{viewingRecord.preferredCampus}</strong>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-500 mb-3">
                  Contact Coordinates
                </h4>
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span><strong>Phone / WhatsApp:</strong> {viewingRecord.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <span><strong>Email:</strong> {viewingRecord.email}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Address:</strong> {viewingRecord.address}</span>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-500 mb-3">
                  Change Application Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(['Pending Review', 'Verified', 'Interview Scheduled', 'Enrolled', 'Rejected'] as ApplicationRecord['status'][]).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(viewingRecord.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        viewingRecord.status === st
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Registrar Notes */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-500 mb-2">
                  Registrar Verification Notes
                </h4>
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Enter notes on candidate test score, document verification, or batch timing..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveNotes(viewingRecord.id)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Submitted on: {new Date(viewingRecord.submittedAt).toLocaleDateString()}
              </span>
              <button
                type="button"
                onClick={() => setViewingRecord(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
