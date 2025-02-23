/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ForHospital from "./Pages/ForHospital/ForHospitalHome";
import 'swiper/css';
import 'swiper/css/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'swiper/css/pagination';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import AboutUsHome from './components/AboutUs/AboutUsHome';
import ServicesHome from './components/Services/ServicesHome';
import ContactInfoCard from './components/Contact/ContactInfoCard';
import ContactHome from './components/Contact/ContactHome';
import DoctorHome from './Doctor/DoctorHome';
import IPDHome from './IPD/IPD';
import OPDHome from './components/OPD/OPDHome';
import TeamHome from './components/Team/TeamHome';
import NewFooter from './components/NewFooter';
import Patient from './components/Patient';

const App = () => {
  return (
    <Router> {/* ✅ Wrap everything inside BrowserRouter */}
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospital" element={<ForHospital />} />
          <Route path="/about" element={<AboutUsHome />} />
          <Route path="/services" element={<ServicesHome />} />
          <Route path="/contacts" element={<ContactHome />} />
          <Route path="/team" element={<TeamHome />} />
          <Route path="/doctors" element={<DoctorHome />} />
          <Route path="/hospital/ipd" element={<IPDHome />} />
          <Route path="/hospital/opd" element={<OPDHome />} />
          <Route path="/patients" element={<Patient />} />
        </Routes>
        {/* <Footer /> */}
        <NewFooter />
      </div>
    </Router>
  );
};

export default App;
