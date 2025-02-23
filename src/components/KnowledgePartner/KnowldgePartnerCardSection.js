import React from "react";
import OfferContentSection from "../Common/OfferContentSection";

// Import local images
import Image1 from "../../img/Google.png";
import Image2 from "../../img/IIT BOMBAY.png";
import Image3 from "../../img/IITIndore.png";
import TwoFactors from "../../img/2 factors.png";
import NBHA from "../../img/Nbha150x150.png";
import Gold from "../../img/gold-150x150.png";
import Bharat from "../../img/BHart150x150.png";

const KnowledgePartnerCardSection = () => {
  const cards = [
    { title: "GOOGLE", image: Image1 },
    { title: "IIT BOMBAY", image: Image2 },
    { title: "IIT INDORE", image: Image3 },
  ];

  const accreditations = [
    { image: NBHA, title: "NABH" },
    { image: Gold, title: "Gold Quality" },
    { image: Bharat, title: "Bhart Accreditation" },
  ];

  return (
    <div className="container mx-auto px-4 md:py-12 w-11/12 ">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start text-center lg:text-left  ">
        {/* Section: We Are */}
        <div className=" text-[#2E4168] md:space-y-4 -space-y-5  ">
          <OfferContentSection titleDesktop="We Are !" titleMobile="We Are !" 
          
          className="text-xl md:text-lg lg:text-base leading-tight"/>
          <img
            src={TwoFactors}
            alt="Two Factors"
            className="w-full max-w-xl object-contain transition-all duration-300 transform md:mt-4 md:ml-16 lg:ml-0  "
          />
        </div>

        {/* Section: Our Knowledge Partners */}
   


        {/* Section: Accredited */}
        <div className="xl:space-y-4 lg:-space-y-5 md:space-y-2 -space-y-7 text-[#2E4168]">
          <OfferContentSection
            titleDesktop="Accredited"
            titleMobile="Accredited"
          />
          <div className="flex justify-center lg:justify-end gap-4">
            {accreditations.map((item, index) => (
              <div key={index} className="text-center ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 mx-auto object-contain rounded-lg"
                />
                <p className="mt-2 text-xs md:text-sm lg:text-xs xl:text-base font-semibold ">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className=" text-[#2E4168] mx-auto xl:space-y-4 lg:-space-y-12 md:space-y-2 -space-y-7 ">
        <OfferContentSection
    titleDesktop="Our Knowledge Partners"
    titleMobile="Our Knowledge Partners"
    className=" text-7xl md:text-base lg:text-xs xl:text-base font-bold text-center mx-auto"
  />
  
  <div className="flex justify-center gap-4 ">
    {cards.map((card, index) => (
      <div key={index} className="text-center ">
        <img
          src={card.image}
          alt={card.title}
          className="w-28 h-28 mx-auto object-contain rounded-lg"
        />
        <p className="mt-2 text-xs md:text-sm lg:text-xs xl:text-base font-semibold">
          {card.title}
        </p>
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
};

export default KnowledgePartnerCardSection;
