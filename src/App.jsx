import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import StudentDetails from './pages/StudentDetails';
import EditStudent from './pages/EditStudent';
import NotFound from './pages/NotFound';

/**
 * App Component
 * 
 * Sets up the React Router Single Page Application (SPA) structure:
 * - Navbar stays fixed at the top across all pages
 * - Routes dynamically renders the matching page based on the current URL
 * - Footer stays at the bottom across all pages
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/students/edit/:id" element={<EditStudent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
