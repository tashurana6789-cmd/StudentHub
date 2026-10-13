import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudentById, updateStudent } from '../services/studentApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

/**
 * EditStudent Page
 * 
 * Route: /students/edit/:id
 * 
 * Demonstrates:
 * - Using useParams to identify which student is being edited
 * - Fetching initial student data to populate the edit form (pre-fill)
 * - Controlled input handling and form validation
 * - Updating existing records on JSON Server using Axios PUT
 * - Navigating back upon completion
 */
function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    course: 'Computer Science',
    city: '',
    address: '',
    enrollmentDate: '',
    status: 'Active',
  });

  // Page states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const availableCourses = [
    'Computer Science',
    'Information Technology',
    'Data Science',
    'Artificial Intelligence',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Business Administration',
    'Design & Multimedia',
  ];

  // Fetch initial student record to pre-populate the form
  const loadStudentData = async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const student = await getStudentById(id);
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        age: student.age || '',
        gender: student.gender || 'Male',
        course: student.course || 'Computer Science',
        city: student.city || '',
        address: student.address || '',
        enrollmentDate: student.enrollmentDate || '',
        status: student.status || 'Active',
      });
    } catch (err) {
      console.error('Failed to load student for editing:', err);
      setFetchError(`Could not find student record #${id} to edit.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudentData();
  }, [id]);

  // Universal handler for updating form input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Form validation before submit
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Student full name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required.';
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum < 15 || ageNum > 90) {
        newErrors.age = 'Age must be between 15 and 90.';
      }
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = 'Enrollment date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle PUT submission to update record
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        age: Number(formData.age),
        city: formData.city.trim(),
        address: formData.address.trim(),
      };

      await updateStudent(id, payload);

      // Redirect back to the student details page or directory
      navigate(`/students/${id}`);
    } catch (err) {
      console.error('Error updating student:', err);
      setSubmitError('Failed to update student details. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        <Link to={`/students/${id}`}>#{id}</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Edit</span>
      </nav>

      {/* Loading state while fetching initial data */}
      {isLoading && <Loader message="Loading student data for editing..." />}

      {/* Error state if student ID is not found */}
      {fetchError && (
        <div className="details-error-wrapper">
          <ErrorMessage message={fetchError} onRetry={loadStudentData} />
          <div className="text-center" style={{ marginTop: '1.5rem' }}>
            <Link to="/students" className="btn btn-primary btn-md">
              ← Return to Students
            </Link>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {!isLoading && !fetchError && (
        <div className="form-page-layout">
          <div className="form-card">
            <div className="form-header">
              <h1 className="form-title">✏️ Edit Student Record</h1>
              <p className="form-subtitle">
                Update information for student <strong>#{id} - {formData.name}</strong>
              </p>
            </div>

            {submitError && (
              <div className="alert-box alert-danger">
                ⚠️ {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="student-form" noValidate>
              <div className="form-grid">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label required">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className={`input-field ${errors.name ? 'input-error' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error-text-inline">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label required">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className={`input-field ${errors.email ? 'input-error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-text-inline">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label required">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className={`input-field ${errors.phone ? 'input-error' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="error-text-inline">{errors.phone}</span>}
                </div>

                {/* Age */}
                <div className="form-group">
                  <label htmlFor="age" className="form-label required">
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    min="15"
                    max="90"
                    className={`input-field ${errors.age ? 'input-error' : ''}`}
                    value={formData.age}
                    onChange={handleChange}
                  />
                  {errors.age && <span className="error-text-inline">{errors.age}</span>}
                </div>

                {/* Gender */}
                <div className="form-group">
                  <label htmlFor="gender" className="form-label required">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="select-field"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Course */}
                <div className="form-group">
                  <label htmlFor="course" className="form-label required">
                    Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    className={`select-field ${errors.course ? 'input-error' : ''}`}
                    value={formData.course}
                    onChange={handleChange}
                  >
                    {availableCourses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.course && <span className="error-text-inline">{errors.course}</span>}
                </div>

                {/* City */}
                <div className="form-group">
                  <label htmlFor="city" className="form-label required">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    className={`input-field ${errors.city ? 'input-error' : ''}`}
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <span className="error-text-inline">{errors.city}</span>}
                </div>

                {/* Enrollment Date */}
                <div className="form-group">
                  <label htmlFor="enrollmentDate" className="form-label required">
                    Enrollment Date
                  </label>
                  <input
                    id="enrollmentDate"
                    type="date"
                    name="enrollmentDate"
                    className={`input-field ${errors.enrollmentDate ? 'input-error' : ''}`}
                    value={formData.enrollmentDate}
                    onChange={handleChange}
                  />
                  {errors.enrollmentDate && <span className="error-text-inline">{errors.enrollmentDate}</span>}
                </div>

                {/* Status */}
                <div className="form-group">
                  <label htmlFor="status" className="form-label required">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="select-field"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {/* Address (Full Row) */}
                <div className="form-group full-width">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="input-field textarea-field"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline btn-md"
                  onClick={() => navigate(`/students/${id}`)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : '💾 Update Student Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditStudent;
