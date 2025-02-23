import React from "react";
import { 
  FaClock, FaBrain, FaFileMedical, FaCalendarCheck, 
  FaDigitalTachograph, FaHospital, FaUserShield, FaChartLine 
} from "react-icons/fa";
import { motion } from "framer-motion";

const WhyGudmedUnique = () => {
  const sections = [
    {
      icon: <FaDigitalTachograph className="text-blue-600 text-4xl mb-3" />,
      title: "Real-Time Prescription Digitization",
      description:
        "Experience the power of real-time digitization! With GudMed, handwritten prescriptions are instantly transformed into digital formats, seamlessly sent to pharmacies, and boost operational efficiency. Hospitals can also provide instant lab test bookings and results, ensuring patient convenience and satisfaction.",
    },
    {
      icon: <FaHospital className="text-blue-600 text-4xl mb-3" />,
      title: "Comprehensive Hospital Support",
      description: "We empower hospitals with features designed to streamline operations:",
      points: [
        {
          icon: <FaClock className="text-blue-600 text-lg" />,
          text: "Quick Discharge Summaries: Reducing patient waiting times.",
        },
        {
          icon: <FaBrain className="text-blue-600 text-lg" />,
          text: "AI-Driven Solutions: Enhancing operational excellence.",
        },
        {
          icon: <FaFileMedical className="text-blue-600 text-lg" />,
          text: "MRD File Management: Capturing patient records across OPD and IPD.",
        },
        {
          icon: <FaCalendarCheck className="text-blue-600 text-lg" />,
          text: "Post-Care Management: Timely medication reminders and follow-up scheduling.",
        },
      ],
    },
    {
      icon: <FaUserShield className="text-blue-600 text-4xl mb-3" />,
      title: "Enhanced Patient Engagement",
      description:
        "GudMed puts patients at the heart of healthcare. By educating them about treatments and providing timely reminders, we ensure better health outcomes. Patients can access their medical documents digitally, making their healthcare journey smooth and transparent.",
    },
    {
      icon: <FaChartLine className="text-blue-600 text-4xl mb-3" />,
      title: "Seamless Workflow Integration",
      description:
        "Our technology adapts to your needs, not the other way around. Whether it’s editable discharge summaries, role-based EMR access, or integrated lab and radiology services, GudMed ensures your hospital’s workflows remain uninterrupted.",
    },
    {
      icon: <FaUserShield className="text-blue-600 text-4xl mb-3" />,
      title: "Data Security and Privacy",
      description:
        "Your trust matters. GudMed ensures stringent data protection and confidentiality, adhering to global standards. We guarantee no sharing of Scoped Data with third parties, prioritizing your patients' privacy.",
    },
    {
      icon: <FaDigitalTachograph className="text-blue-600 text-4xl mb-3" />,
      title: "Customizable and Scalable Solutions",
      description:
        "No matter the size of your organization, GudMed offers flexible, scalable solutions tailored to your needs. From small clinics to large hospitals, our technology grows with you.",
    },
   
  ];

  return (
    <section className="bg-white py-10 px-6 lg:px-20">
      <div className="container mx-auto">
        <motion.h2
          className="text-[1.8rem] lg:text-4xl font-bold text-[#2E4168] text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why GudMed is Unique  ?
        </motion.h2>
        <motion.pmd
         className="block text-xl md:max-w-3xl font-medium text-gray-800 text-center mb-12 mx-auto"

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          GudMed is revolutionizing healthcare with innovative, patient-focused solutions designed to meet the unique needs of hospitals, doctors, and patients.
        </motion.pmd>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                {section.icon}
                <h3 className="text-2xl font-semibold text-[#2E4168] mb-4">
                  {section.title}
                </h3>
              </div>
              <p className="text-[#2E4168] mb-4">{section.description}</p>
              {section.points && (
                <ul className="space-y-3">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      {point.icon}
                      <span className="text-gray-600">{point.text}</span>
                    </li>
                  ))}
                </ul>

              )}
              
            </motion.div>
          ))}
        </div>
        <div className="mt-4 bg-white  py-12 px-6 rounded-xl shadow-lg text-center">
  <div className="max-w-3xl mx-auto">
    <h3 className="text-3xl lg:text-4xl font-bold text-[#2E4168] mb-4 leading-tight">
      Join the GudMed Revolution
    </h3>
    <p className="text-lg font-medium text-gray-700 mb-6  ">
      Partner with GudMed and embrace a smarter, more efficient future for healthcare. Contact us today to learn how we can transform your healthcare operations.
    </p>
    <div className="mt-6">
      <a
        href="/contacts" // This can be changed to your contact page link
        className="bg-[#2E4168] text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-[#1A3051] hover:shadow-lg transition-all duration-300"
      >
        Contact Us Today
      </a>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default WhyGudmedUnique;
