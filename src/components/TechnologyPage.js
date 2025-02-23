import React from "react";
import { FaHospital, FaRobot, FaChartBar, FaRegPaperPlane, FaHeartbeat, FaMedkit,FaClipboardCheck } from "react-icons/fa";
import { FiSettings, FiActivity } from "react-icons/fi";
import { motion } from "framer-motion";


const cardsData = [
  { icon: FaHospital, title: "EMR Integration", description: "Seamless EMR and hospital system integration." },
  { icon: FaChartBar, title: "AI Analytics", description: "AI-powered data analytics for actionable insights." },
  { icon: FiSettings, title: "Document Digitization", description: "Real-time document digitization and processing." },
  { icon: FiActivity, title: "Automated Workflows", description: "Automated workflows for improved efficiency." },
];

const motionCardsData = [
  {
    icon: FaRegPaperPlane,
    title: "Revolutionizing Healthcare",
    description: "Experience seamless patient care with GudMed's cutting-edge technology. From digital prescriptions to real-time updates, revolutionize your healthcare journey.",
    bgColor: "#FF6F61",
  },
  {
    icon: FaRobot,
    title: "AI-Powered Solutions for Smarter Hospitals",
    description: "Enhance operational efficiency with GudMed's AI integration. Quick discharge summaries, proactive patient engagement, and streamlined workflows—all in one place.",
    bgColor: "#00A9E0",
  },
  {
    icon: FaHeartbeat,
    title: "Seamless Care Beyond the Hospital",
    description: "GudMed bridges the gap between hospitals and patients. From timely reminders to centralized medical records, care continues wherever you go.",
    bgColor: "#F4A300",
  },
  {
    icon: FaMedkit,
    title: "Faster Discharges, Higher Satisfaction",
    description: "Cut down waiting times with GudMed. Speed up discharges and elevate patient satisfaction while maximizing hospital ROI.",
    bgColor: "#F17C67",
  },
];

const HighlightCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out p-6 rounded-xl flex flex-col items-center border border-gray-200 hover:border-blue-300">
    <Icon className="text-blue-500 text-5xl mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const MotionCard = ({ icon: Icon, title, description, bgColor }) => (
  <motion.div
    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`flex items-center justify-center mb-6 p-4 rounded-full`} style={{ backgroundColor: bgColor }}>
      <Icon className="text-white text-5xl" />
    </div>
    <h4 className="text-2xl font-semibold text-[#2E4168] mb-4">{title}</h4>
    <p className="text-[#2E4168] text-base font-medium">{description}</p>
  </motion.div>
);

const TechnologyPage = () => (
  <div className="bg-white min-h-screen py-12 px-6 ">
    <div className="text-center mb-6 -mt-12 md:-mt-6">
  <h1 className="text-4xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-4 p-6">
    GudMed’s Technology
  </h1>
  <p className="text-gray-700 max-w-3xl mx-auto text-lg mt-0 md:-mt-4">
    GudMed’s technology is designed to optimize healthcare operations through automation and intelligent tools. Our platform integrates seamlessly with hospital systems, enabling real-time access to patient data, reports, and medication history.
  </p>
</div>


    <section className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  gap-8">
        {cardsData.map((card, index) => (
          <HighlightCard key={index} {...card} />
        ))}
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="container mx-auto px-2 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16">
          {motionCardsData.map((card, index) => (
            <MotionCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
    <section>
    <div className="text-center mb-6">
  <h2 className="text-4xl font-bold text-[#2E4168] relative inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text leading-normal">
    Artificial Intelligence
    <div className="h-1 w-32 bg-[#2E4168] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 absolute left-1/2 -translate-x-1/2 "></div>
  </h2>
</div>

      <p className="text-gray-700 max-w-5xl mx-auto text-lg mb-10 md:mx-4 xl:mx-auto ">
        Artificial intelligence is transforming healthcare, and GudMed is at the forefront of this revolution. Our AI-driven platform helps hospitals and doctors make data-backed decisions faster. From predicting patient outcomes to optimizing workflows, our AI tools improve efficiency, reduce errors, and offer a personalized healthcare experience for every patient.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  gap-8">
        <HighlightCard
          icon={FaRobot}
          title="Predictive Analytics"
          description="Predictive analytics for better patient care."
        />
        <HighlightCard
          icon={FaClipboardCheck}
          title="Automated Reports"
          description="Automating administrative tasks like report generation."
        />
        <HighlightCard
          icon={FiActivity}
          title="Operational Insights"
          description="AI-driven insights for operational improvements."
        />
        <HighlightCard
          icon={FaChartBar}
          title="Personalized Treatment"
          description="Personalizing patient treatment plans"
        />
      </div>
    </section>
  </div>
);

export default TechnologyPage;