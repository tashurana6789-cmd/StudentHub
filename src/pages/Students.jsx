import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/studentApi';
import StudentCard from '../components/StudentCard';
import StudentTable from '../components/StudentTable';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Students Page
 * 
 * Route: /students
 * 
 * Demonstrates:
 * - Fetching student list from JSON Server using Axios
 * - Client-side live searching across multiple properties
 * - Dynamic course and status filtering
 * - Sorting by name, age, and enrollment date
 * - Grid View vs. Table View toggle
 * - Safe student deletion with confirmation dialog and toast/alert feedback
 */
function Students() {
  // Main data states
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search, Filter, and Sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Action feedback states
  const [actionSuccess, setActionSuccess] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleteStudentName, setDeleteStudentName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to fetch students. Please verify that JSON Server is running on port 3000.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Compute unique courses list for filter dropdown
  const coursesList = ['All', ...new Set(students.map((s) => s.course).filter(Boolean))];
  const statusList = ['All', 'Active', 'Inactive', 'Graduated', 'Suspended'];

  // Initiate delete confirmation modal
  const handleDeleteClick = (id, name) => {
    setDeleteConfirmId(id);
    setDeleteStudentName(name);
  };

  // Confirm and execute delete via API
  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setIsDeleting(true);
      await deleteStudent(deleteConfirmId);
      // Remove the deleted student from local state immediately
      setStudents((prev) => prev.filter((s) => s.id !== deleteConfirmId));
      setActionSuccess(`Student "${deleteStudentName}" was successfully deleted.`);
      // Clear success notification after 4 seconds
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete student. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
      setDeleteStudentName('');
    }
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCourse('All');
    setSelectedStatus('All');
    setSortBy('name-asc');
  };

  // Process Search, Filter, and Sort logic
  const filteredAndSortedStudents = students
    .filter((student) => {
      // 1. Search Query Filter (Matches Name, Email, Course, or City)
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        student.name?.toLowerCase().includes(query) ||
        student.email?.toLowerCase().includes(query) ||
        student.course?.toLowerCase().includes(query) ||
        student.city?.toLowerCase().includes(query);

      // 2. Course Filter
      const matchesCourse =
        selectedCourse === 'All' || student.course === selectedCourse;

      // 3. Status Filter
      const matchesStatus =
        selectedStatus === 'All' ||
        student.status?.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesCourse && matchesStatus;
    })
    .sort((a, b) => {
      // 4. Sorting logic
      switch (sortBy) {
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'age-asc':
          return (Number(a.age) || 0) - (Number(b.age) || 0);
        case 'age-desc':
          return (Number(b.age) || 0) - (Number(a.age) || 0);
        case 'date-newest':
          return new Date(b.enrollmentDate || 0) - new Date(a.enrollmentDate || 0);
        case 'date-oldest':
          return new Date(a.enrollmentDate || 0) - new Date(b.enrollmentDate || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-flex">
        <div>
          <h1 className="page-title">👥 Student Directory</h1>
          <p className="page-subtitle">
            Search, filter, sort, and manage all enrolled student records.
          </p>
        </div>
        <Link to="/students/add" className="btn btn-primary btn-md">
          ➕ Register New Student
        </Link>
      </div>

      {/* Action Notification */}
      {actionSuccess && (
        <div className="toast-success">
          <span>✅ {actionSuccess}</span>
          <button className="toast-close" onClick={() => setActionSuccess('')}>✕</button>
        </div>
      )}

      {/* Search and Control Bar */}
      <section className="controls-card">
        <div className="controls-grid">
          {/* Search Box */}
          <div className="control-group search-group">
            <label htmlFor="search-input" className="control-label">Search Directory</label>
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                id="search-input"
                type="text"
                className="input-field search-input"
                placeholder="Search by name, email, course, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter by Course */}
          <div className="control-group">
            <label htmlFor="course-select" className="control-label">Filter Course</label>
            <select
              id="course-select"
              className="select-field"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {coursesList.map((course) => (
                <option key={course} value={course}>
                  {course === 'All' ? 'All Courses' : course}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Status */}
          <div className="control-group">
            <label htmlFor="status-select" className="control-label">Filter Status</label>
            <select
              id="status-select"
              className="select-field"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusList.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="control-group">
            <label htmlFor="sort-select" className="control-label">Sort Records</label>
            <select
              id="sort-select"
              className="select-field"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="age-asc">Age (Youngest First)</option>
              <option value="age-desc">Age (Oldest First)</option>
              <option value="date-newest">Enrollment (Newest First)</option>
              <option value="date-oldest">Enrollment (Oldest First)</option>
            </select>
          </div>
        </div>

        {/* Results Summary Bar & View Mode Toggle */}
        <div className="controls-footer">
          <div className="results-counter">
            Showing <strong>{filteredAndSortedStudents.length}</strong> of{' '}
            <strong>{students.length}</strong> students
            {(searchTerm || selectedCourse !== 'All' || selectedStatus !== 'All') && (
              <button
                type="button"
                className="btn-link-reset"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="view-mode-toggle">
            <button
              type="button"
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ⊞ Grid
            </button>
            <button
              type="button"
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              ☰ Table
            </button>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && <Loader message="Fetching students from server..." />}

      {/* Error State */}
      {error && <ErrorMessage message={error} onRetry={fetchStudents} />}

      {/* Student List (Grid or Table View) */}
      {!isLoading && !error && (
        <>
          {filteredAndSortedStudents.length === 0 ? (
            <div className="empty-state-card">
              <div className="empty-icon">📂</div>
              <h3>No Students Found</h3>
              <p>No student records matched your search or filter criteria.</p>
              <button className="btn btn-secondary btn-md" onClick={handleResetFilters}>
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="student-grid">
              {filteredAndSortedStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          ) : (
            <StudentTable
              students={filteredAndSortedStudents}
              onDelete={handleDeleteClick}
            />
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to permanently delete the record for{' '}
                <strong>{deleteStudentName}</strong>?
              </p>
              <p className="modal-warning">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-outline btn-md"
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger btn-md"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Student'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
