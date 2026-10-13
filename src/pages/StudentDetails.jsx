import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudentById, deleteStudent } from '../services/studentApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

/**
 * StudentDetails Page
 * 
 * Route: /students/:id
 * 
 * Demonstrates:
 * - Extracting dynamic route parameters using useParams hook
 * - Fetching a single record from JSON Server by ID
 * - Deleting a record from the details page and redirecting
 * - Handling loading and not-found/error states
 */
function StudentDetails() {
  // Extract student ID from the URL path: /students/:id
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch individual student details from JSON Server
  const fetchStudentDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getStudentById(id);
      setStudent(data);
    } catch (err) {
      console.error('Error fetching student details:', err);
      setError(`Could not find student record with ID #${id}.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  // Handle Delete Confirmation
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteStudent(id);
      // Navigate back to the students directory after deletion
      navigate('/students');
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('Failed to delete student. Please try again.');
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Extract initials for the avatar badge
  const getInitials = (name) => {
    if (!name) return 'ST';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Helper for status styling
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'badge-active';
      case 'graduated':
        return 'badge-graduated';
      case 'inactive':
        return 'badge-inactive';
      case 'suspended':
        return 'badge-suspended';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className="page-container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/students">Students</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">
          {student ? student.name : `Student #${id}`}
        </span>
      </nav>

      {/* Loading State */}
      {isLoading && <Loader message="Loading student profile..." />}

      {/* Error State */}
      {error && (
        <div className="details-error-wrapper">
          <ErrorMessage message={error} onRetry={fetchStudentDetails} />
          <div className="text-center" style={{ marginTop: '1.5rem' }}>
            <Link to="/students" className="btn btn-primary btn-md">
              ← Return to Students Directory
            </Link>
          </div>
        </div>
      )}

      {/* Student Profile Card */}
      {!isLoading && !error && student && (
        <div className="details-layout">
          {/* Header Card */}
          <div className="profile-header-card">
            <div className="profile-header-content">
              <div className="profile-avatar">
                {getInitials(student.name)}
              </div>
              <div className="profile-titles">
                <div className="profile-badge-row">
                  <span className="student-id-tag">Student ID: #{student.id}</span>
                  <span className={`status-badge ${getStatusClass(student.status)}`}>
                    {student.status || 'Active'}
                  </span>
                </div>
                <h1 className="profile-name">{student.name}</h1>
                <p className="profile-course">📚 {student.course}</p>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="profile-header-actions">
              <Link to="/students" className="btn btn-outline btn-md">
                ← Back to List
              </Link>
              <Link to={`/students/edit/${student.id}`} className="btn btn-primary btn-md">
                ✏️ Edit Student
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-md"
                onClick={() => setShowDeleteModal(true)}
              >
                🗑️ Delete Record
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="profile-details-grid">
            {/* Academic Information */}
            <div className="detail-panel">
              <h3 className="panel-title">🎓 Academic Information</h3>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-label">Current Course:</span>
                  <span className="info-value font-highlight">{student.course}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Enrollment Date:</span>
                  <span className="info-value">{student.enrollmentDate || 'Not specified'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Academic Status:</span>
                  <span className={`status-badge ${getStatusClass(student.status)}`}>
                    {student.status || 'Active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="detail-panel">
              <h3 className="panel-title">👤 Personal Details</h3>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-label">Full Name:</span>
                  <span className="info-value">{student.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Age:</span>
                  <span className="info-value">{student.age} years old</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Gender:</span>
                  <span className="info-value">{student.gender || 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="detail-panel full-span">
              <h3 className="panel-title">📞 Contact & Location</h3>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-label">Email Address:</span>
                  <span className="info-value">
                    <a href={`mailto:${student.email}`} className="contact-link">
                      {student.email}
                    </a>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone Number:</span>
                  <span className="info-value">
                    <a href={`tel:${student.phone}`} className="contact-link">
                      {student.phone || 'Not provided'}
                    </a>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">City:</span>
                  <span className="info-value">{student.city || 'Not provided'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Residential Address:</span>
                  <span className="info-value">{student.address || 'No residential address recorded.'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to permanently delete the profile for{' '}
                <strong>{student?.name}</strong>?
              </p>
              <p className="modal-warning">This record will be permanently removed from JSON Server.</p>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-outline btn-md"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger btn-md"
                onClick={handleDelete}
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

export default StudentDetails;
