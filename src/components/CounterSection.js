import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import BreadImage from "../img/bread-bg.jpg";
import PrescriptionImage from '../img/prescription.png';
import FaFilePrescriptionImage from "../img/FaFilePrescription.jpg";
import DoctorsImage from "../img/Doctor image.jpg";
import PatientsImage from "../img/Patien iamge.jpg";

const CounterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Base values and increments
  const baseStats = {
    prescriptionsServed: 2650627,
    hindiPrescriptionsServed: 877645,
    doctorsWithUs: 3850,
    happyPatients: 180000,
  };
  const increments = {
    prescriptionsServed: 1156,
    hindiPrescriptionsServed: 369,
    doctorsWithUs: 50,
    happyPatients: 5000,
  };

  // Function to get incremented stats on each visit
  const getIncrementedStats = () => {
    const storedStats = JSON.parse(localStorage.getItem('stats')) || baseStats;

    // Increment each stat by the defined amount
    const updatedStats = {
      prescriptionsServed: storedStats.prescriptionsServed + increments.prescriptionsServed,
      hindiPrescriptionsServed: storedStats.hindiPrescriptionsServed + increments.hindiPrescriptionsServed,
      doctorsWithUs: storedStats.doctorsWithUs + increments.doctorsWithUs,
      happyPatients: storedStats.happyPatients + increments.happyPatients,
    };

    // Save the updated stats back to local storage
    localStorage.setItem('stats', JSON.stringify(updatedStats));
    return updatedStats;
  };

  // Initialize stats with incremented values
  const [stats, setStats] = useState(getIncrementedStats());

  useEffect(() => {
    // Detect visibility of the section
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Disconnect after the animation starts
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative py-12 md:py-16 lg:py-24">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BreadImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      {/* Background Color Layer */}
      <div className="absolute inset-0 bg-[#2E4168] opacity-80"></div>
      {/* Content Layer */}
      <div className="relative z-10 container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 text-center text-white">
        {[
          {
            icon: <img src={PrescriptionImage} alt="Prescription Icon" className="w-10 h-10" />,
            number: stats.prescriptionsServed,
            label: 'Prescriptions Served',
          },
          {
            icon: <img src={FaFilePrescriptionImage} alt="Hindi Prescription Icon" className="w-10 h-10" />,
            number: stats.hindiPrescriptionsServed,
            label: 'Hindi Prescriptions Served',
          },
          {
            icon: <img src={DoctorsImage} alt="Doctor Icon" className="w-10 h-10" />,
            number: stats.doctorsWithUs,
            label: 'Doctors With Us',
          },
          {
            icon: <img src={PatientsImage} alt="Patient Icon" className="w-10 h-10" />,
            number: stats.happyPatients,
            label: 'Happy Patients',
          },
        ].map((stat, index) => (
          <div key={index} className="group">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto flex items-center justify-center rounded-full bg-[#2E4168] group-hover:bg-white border-2 border-transparent border-white group-hover:border-customBlue transition-all duration-300">
              <div className="text-white group-hover:text-[#2E4168] group-hover:bg-transparent hover:text-white">
                {stat.icon}
              </div>
            </div>

            <div className="text-4xl md:text-5xl font-bold mt-4">
              {isVisible ? (
                <CountUp start={0} end={stat.number} duration={5} separator="," />
              ) : (
                '0'
              )}
            </div>
            <p className="text-base md:text-lg mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterSection;