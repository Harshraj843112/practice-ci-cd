import React from "react";
import {
  DocumentDuplicateIcon,
  DocumentTextIcon,
  MagnifyingGlassCircleIcon,
  ChartBarIcon,
  LinkIcon,
  ClipboardDocumentCheckIcon,
  BellAlertIcon,
  ShieldCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const ComparisonSection = () => {
  const comparisonData = [
    {
      aspect: "Prescription Handling",
      other: {
        text: "Stores xerox/digital copies of handwritten prescriptions without full digitization",
        icon: <DocumentDuplicateIcon className="h-6 w-6 text-red-500 inline-block mr-2" />,
      },
      gudmed: {
        text: "Fully digitizes handwritten prescriptions and converts data into a digital format",
        icon: <DocumentTextIcon className="h-6 w-6 text-green-500 inline-block mr-2" />,
      },
    },
    {
      aspect: "Data Accessibility",
      other: {
        text: "Limited to viewing scanned or xeroxed copies",
        icon: <MagnifyingGlassCircleIcon className="h-6 w-6 text-red-500 inline-block mr-2" />,
      },
      gudmed: {
        text: "Provides structured, searchable data, allowing easy access to individual prescription details",
        icon: <ChartBarIcon className="h-6 w-6 text-green-500 inline-block mr-2" />,
      },
    },
    {
      aspect: "Data Usability",
      other: {
        text: "Minimal usability for analytics or processing",
        icon: <ChartBarIcon className="h-6 w-6 text-red-500 inline-block mr-2" />,
      },
      gudmed: {
        text: "Enables analytics, easy access, and integration for various use cases, such as patient engagement and follow-ups",
        icon: <LinkIcon className="h-6 w-6 text-green-500 inline-block mr-2" />,
      },
    },
    {
      aspect: "Integration Capability",
      other: {
        text: "Limited due to storage of image files rather than structured data",
        icon: <LinkIcon className="h-6 w-6 text-red-500 inline-block mr-2" />,
      },
      gudmed: {
        text: "High integration capability with other hospital systems, pharmacies, and labs",
        icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500 inline-block mr-2" />, 
      },
    },
    {
      aspect: "Operational Efficiency",
      other: {
        text: "Provides a basic digital record but does not improve workflow significantly",
        icon: <BellAlertIcon className="h-6 w-6 text-red-500 inline-block mr-2" />,
      },
      gudmed: {
        text: "Improves operational efficiency through automated reminders, real-time pharmacy updates, and lab test offerings",
        icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500 inline-block mr-2" />, 
      },
    },
    {
      aspect: "Patient Engagement",
      other: {
        text: "Limited engagement; does not facilitate reminders or follow-up actions",
        icon: <BellAlertIcon className="h-6 w-6 text-red-500 inline-block mr-2" />,
      },
      gudmed: {
        text: "Engages patients with reminders for medication, follow-up appointments, and lab test notifications",
        icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500 inline-block mr-2" />, 
      },
    },
    {
      aspect: "Document Format",
      other: {
        text: "Retains original handwriting in an image format",
        icon: <DocumentDuplicateIcon className="h-6 w-6 text-red-500 inline-block mr-2" />,
      },
      gudmed: {
        text: "Converts prescription to a digital text format, making it easier to use and share electronically",
        icon: <DocumentTextIcon className="h-6 w-6 text-green-500 inline-block mr-2" />,
      },
    },
    {
      aspect: "Technology Benefits",
      other: {
        text: "Provides a basic digitization solution, often for record-keeping",
        icon: <ShieldCheckIcon className="h-6 w-6 text-red-500 inline-block mr-2" />,
      },
      gudmed: {
        text: "Offers real-time benefits, reducing discharge times and enhancing patient care post-treatment",
        icon: <LockClosedIcon className="h-6 w-6 text-green-500 inline-block mr-2" />,
      },
    },
    {
      aspect: "Data Security",
      other: {
        text: "Stores data as images, often without structured data safeguards",
        icon: <ShieldCheckIcon className="h-6 w-6 text-red-500 inline-block mr-2" />,
      },
      gudmed: {
        text: "Offers structured, securely managed data without third-party sharing",
        icon: <LockClosedIcon className="h-6 w-6 text-green-500 inline-block mr-2" />,
      },
    },
  ];

  return (
    <section className="bg-white py-0 sm:px-6 lg:px-8 px-1">
     <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2E4168] leading-snug sm:leading-normal mt-6 mb-8 space-x-4">
  <span className="text-3xl sm:text-4xl lg:text-4xl text-[#2E4168] ml-2 font-bold">
    GudMed
  </span>
  <span className="text-3xl sm:text-4xl lg:text-4xl text-[#2E4168] ">vs</span>
  <span className="text-3xl sm:text-4xl lg:text-4xl text-[#2E4168] ml-4">
    Other Technologies
  </span>
</h1>



      <div className="overflow-hidden shadow-lg rounded-lg">
        <div className="overflow-x-hidden w-full">
          <table className="table-auto min-w-full bg-white rounded-lg text-sm sm:text-base ">
            <thead className="bg-[#2E4168] text-white">
              <tr>
                <th className="border border-[#414c61] px-2 sm:px-4 py-2 sm:py-3 text-left font-bold">Aspect</th>
                <th className="border border-[#414c61] px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Other Technologies</th>
                <th className="border border-[#414c61] px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-2xl mx-auto ">GudMed </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-transform duration-300`}
                >
                  <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-4 text-blue-900 font-bold">
                    {item.aspect}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-4 text-gray-600">
                    {item.other.icon}
                    {item.other.text}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-4 text-[#2E4168] font-bold">
                    {item.gudmed.icon}
                    {item.gudmed.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
