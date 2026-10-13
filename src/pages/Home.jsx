import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../services/studentApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Home Page (Dashboard)
 * 
 * Route: /
 * 
 * Demonstrates:
 * - useState for managing data, loading, and error states
 * - useEffect for fetching dashboard data on component mount
 * - Dynamic statistics calculation
 */
function Home() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all students on component mount to compute stats
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Could not connect to the backend server. Make sure JSON Server is running on port 3000.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Compute key metrics from the fetched students
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status?.toLowerCase() === 'active').length;
  const uniqueCourses = new Set(students.map((s) => s.course).filter(Boolean)).size;
  const uniqueCities = new Set(students.map((s) => s.city).filter(Boolean)).size;

  // Take the 4 most recently listed students
  const recentStudents = students.slice(0, 4);

  return (
    <div className="page-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-badge">🚀 Welcome to StudentHub</div>
        <h1 className="hero-title">Manage Students with Speed & Clarity</h1>
        <p className="hero-subtitle">
          A centralized, modern dashboard to view, register, edit, and organize all student academic records with real-time JSON Server synchronization.
        </p>
        <div className="hero-actions">
          <Link to="/students" className="btn btn-primary btn-lg">
            👥 View All Students
          </Link>
          <Link to="/students/add" className="btn btn-outline btn-lg">
            ➕ Register New Student
          </Link>
        </div>
      </section>

      {/* Loading & Error States */}
      {isLoading && <Loader message="Loading dashboard statistics..." />}
      {error && <ErrorMessage message={error} onRetry={fetchDashboardData} />}

      {/* Dashboard Stats */}
      {!isLoading && !error && (
        <>
          <section className="stats-section">
            <h2 className="section-title">📊 Key Metrics Overview</h2>
            <div className="stats-grid">
              <div className="stat-card stat-blue">
                <div className="stat-icon">🎓</div>
                <div className="stat-info">
                  <span className="stat-number">{totalStudents}</span>
                  <span className="stat-label">Total Enrolled</span>
                </div>
              </div>

              <div className="stat-card stat-green">
                <div className="stat-icon">🟢</div>
                <div className="stat-info">
                  <span className="stat-number">{activeStudents}</span>
                  <span className="stat-label">Active Students</span>
                </div>
              </div>

              <div className="stat-card stat-purple">
                <div className="stat-icon">📖</div>
                <div className="stat-info">
                  <span className="stat-number">{uniqueCourses}</span>
                  <span className="stat-label">Courses Offered</span>
                </div>
              </div>

              <div className="stat-card stat-orange">
                <div className="stat-icon">📍</div>
                <div className="stat-info">
                  <span className="stat-number">{uniqueCities}</span>
                  <span className="stat-label">Cities Represented</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Shortcuts */}
          <section className="quick-actions-section">
            <h2 className="section-title">⚡ Quick Management Actions</h2>
            <div className="quick-actions-grid">
              <div className="action-box">
                <div className="action-icon">🔍</div>
                <h3>Search & Filter</h3>
                <p>Quickly look up students by name, course, city, or status with instant filtering.</p>
                <Link to="/students" className="action-link">Open Directory →</Link>
              </div>

              <div className="action-box">
                <div className="action-icon">📝</div>
                <h3>Enroll Student</h3>
                <p>Add new student records with comprehensive academic and contact details.</p>
                <Link to="/students/add" className="action-link">Add Student Form →</Link>
              </div>

              <div className="action-box">
                <div className="action-icon">🔄</div>
                <h3>Real-time CRUD</h3>
                <p>Edit or remove existing records instantly with full REST API synchronization.</p>
                <Link to="/students" className="action-link">Manage Records →</Link>
              </div>
            </div>
          </section>

          {/* Recent Students Preview */}
          <section className="recent-section">
            <div className="section-header-flex">
              <div>
                <h2 className="section-title">👤 Featured Students</h2>
                <p className="section-subtitle">Quick preview of registered student profiles.</p>
              </div>
              <Link to="/students" className="btn btn-outline btn-sm">
                View All ({totalStudents}) →
              </Link>
            </div>

            <div className="recent-cards-grid">
              {recentStudents.map((student) => (
                <div key={student.id} className="preview-card">
                  <div className="preview-top">
                    <h4>{student.name}</h4>
                    <span className="preview-badge">{student.status}</span>
                  </div>
                  <p className="preview-course">📚 {student.course}</p>
                  <p className="preview-city">📍 {student.city || 'Not specified'}</p>
                  <Link to={`/students/${student.id}`} className="btn btn-secondary btn-xs btn-block">
                    View Full Profile
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;
