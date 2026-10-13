import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addStudent } from '../services/studentApi';

/**
 * AddStudent Page
 * 
 * Route: /students/add
 * 
 * Demonstrates:
 * - Controlled form inputs using useState
 * - Form validation with clear inline error messages
 * - Submitting new records to JSON Server using Axios POST
 * - Programmatic navigation using useNavigate hook
 */
function AddStudent() {
  const navigate = useNavigate();

  // Initial form values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    course: 'Computer Science',
    city: '',
    address: '',
    enrollmentDate: new Date().toISOString().split('T')[0], // Defaults to today: YYYY-MM-DD
    status: 'Active',
  });

  // Validation errors state
  const [errors, setErrors] = useState({});
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Server error message state
  const [serverError, setServerError] = useState(null);

  // Standard course choices
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

  // Universal handler for updating form input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for field when user begins typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form fields before submitting
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

  // Submit new student data to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setServerError(null);

      // Format payload ensuring age is a number
      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        age: Number(formData.age),
        city: formData.city.trim(),
        address: formData.address.trim(),
      };

      await addStudent(payload);

      // Redirect user to the students directory upon successful addition
      navigate('/students');
    } catch (err) {
      console.error('Error adding student:', err);
      setServerError('Failed to save student. Make sure JSON Server is running.');
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
        <span className="breadcrumb-current">Add Student</span>
      </nav>

      <div className="form-page-layout">
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">➕ Register New Student</h1>
            <p className="form-subtitle">
              Fill in the details below to add a student to the system.
            </p>
          </div>

          {serverError && (
            <div className="alert-box alert-danger">
              ⚠️ {serverError}
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
                  placeholder="e.g. Rahul Sharma"
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
                  placeholder="e.g. rahul.sharma@example.com"
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
                  placeholder="e.g. +91 98765 43210"
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
                  placeholder="e.g. 21"
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
                  placeholder="e.g. Mumbai"
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

              {/* Address (Span full row) */}
              <div className="form-group full-width">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  className="input-field textarea-field"
                  placeholder="e.g. Flat 304, Green Heights, Andheri East"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline btn-md"
                onClick={() => navigate('/students')}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving Student...' : '💾 Save Student'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
