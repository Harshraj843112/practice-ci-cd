import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import AiimsDelhi from "../img/AIIMS_New_Delhi.png";
import Sharda from "../img/sharda.jpg";
import Amazon from "../img/Amazon.png";
import Patna from "../img/Aiims Patna.png";
import Appolo from "../img/Apollo.png";
import GangaRam from "../img/GangaRam.png";
import Kailash from "../img/kailashHospital.jpeg";
import Jodhpur from "../img/Jodhpur.png";
import Rishikesh from "../img/Rishikesh.png";
import Psri from "../img/Psri.png";

// Reusable Component for Logo Items
const ClientLogo = ({ src, alt }) => (
  <div className="flex justify-center items-center mx-auto w-32 h-32 lg:w-40 lg:h-40">
    <img src={src} alt={alt} className="object-contain w-full h-full" />
  </div>
);

const OurClient = () => {
  const clients = [
    { src: AiimsDelhi, alt: "AIIMS Delhi" },
    { src: Patna, alt: "AIIMS Patna" },
    { src: Jodhpur, alt: "AIIMS Jodhpur" },
    { src: Rishikesh, alt: "AIIMS Rishikesh" },
    { src: Amazon, alt: "Amazon Pharmacy" },
    { src: GangaRam, alt: "Sir Ganga Ram Hospital" },
    { src: Psri, alt: "PSRI Hospital" },
   
    { src: Sharda, alt: "Sharda Hospital" },
    { src: Kailash, alt: "Redcliffe Diagnostics" },
    { src: Appolo, alt: "Apollo Hospital" },
    
  ];

  return (
    <div className="bg-white py-10">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-semibold tracking-wide mb-4 space-x-4">
          <span className="text-[#2E4168] mr-2">Our</span>
          <span className="text-[#2E4168]">Clientele</span>
        </h2>
      </div>

      <div className="w-11/12 mx-auto">
        <Swiper
          spaceBetween={14}
          slidesPerView={4} // Default for large screens
          slidesPerGroup={4}
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={5000}
          loop={true}
          breakpoints={{
            1200: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            480: {
              slidesPerView: 2,
              slidesPerGroup: 2, // Adjust slidesPerGroup to 2 for mobile devices
            },
            320: {
              slidesPerView: 2,
              slidesPerGroup: 2, // Ensure only 2 slides move at a time for smaller screens
            },
          }}
        >
          {clients.concat(clients).map((client, index) => (
            <SwiperSlide key={index}>
              <ClientLogo src={client.src} alt={client.alt} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurClient;
