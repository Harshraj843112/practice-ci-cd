/* src/App.js */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Keep Navbar and NewFooter eagerly loaded
import Navbar    from './components/Navbar/Navbar';
import NewFooter from './components/NewFooter';

// Global CSS stays as-is
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Lazy-load every page/component exactly as originally imported
const Home             = lazy(() => import('./Pages/Home'));
const ForHospital      = lazy(() => import('./Pages/ForHospital/ForHospitalHome'));
const AboutUsHome      = lazy(() => import('./components/AboutUs/AboutUsHome'));
const ServicesHome     = lazy(() => import('./components/Services/ServicesHome'));
const ContactInfoCard  = lazy(() => import('./components/Contact/ContactInfoCard'));
const ContactHome      = lazy(() => import('./components/Contact/ContactHome'));
const DoctorHome       = lazy(() => import('./Doctor/DoctorHome'));
const IPDHome          = lazy(() => import('./IPD/IPD'));
const OPDHome          = lazy(() => import('./components/OPD/OPDHome'));
const TeamHome         = lazy(() => import('./components/Team/TeamHome'));
const Patient          = lazy(() => import('./components/Patient'));
const TermsConditions  = lazy(() => import('./components/TermsConditions'));

export default function App() {
  return (
    <Router>
      <Navbar />
      {/* 
        Suspense will show “Loading…” while any lazy component
        is being fetched—wraps all routes at once :contentReference[oaicite:3]{index=3}
      */}
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/"                 element={<Home />} />
          <Route path="/hospital"         element={<ForHospital />} />
          <Route path="/about"            element={<AboutUsHome />} />
          <Route path="/services"         element={<ServicesHome />} />
          <Route path="/contacts"         element={<ContactHome />} />
          <Route path="/team"             element={<TeamHome />} />
          <Route path="/doctors"          element={<DoctorHome />} />
          <Route path="/hospital/ipd"     element={<IPDHome />} />
          <Route path="/hospital/opd"     element={<OPDHome />} />
          <Route path="/patients"         element={<Patient />} />
          <Route 
            path="/terms-conditions" 
            element={<TermsConditions />} 
          />
          {/* The ContactInfoCard import remains available if you use it inside these pages */}
        </Routes>
      </Suspense>
      {/* <Footer /> */}
      <NewFooter />
    </Router>
  );
}
