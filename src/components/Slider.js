import React, { useState, useRef, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "animate.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Slide Data
const slides = [
  {
    titleDesktop:
      "Revolutionize patient care with <br> cutting-edge Artificial Intelligence <br> tailored for hospitals and<br> healthcare providers.",
    titleMobile:
      "Revolutionize patient <br/> care with cutting-edge <br> Artificial Intelligence tailored for hospitals and <br/>  healthcare providers.",
    gradientWords: ["Artificial Intelligence", "hospitals"],
    gradient: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  },
  {
    titleDesktop: "Harness the <br> Power of <br> GudMed AI",
    titleMobile: "Harness the <br/> Power of <br> GudMed AI",
    gradientWords: ["GudMed AI", "Power"],
    gradient: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  },
  {
    titleDesktop: "Unlock these Benefits",
    titleMobile: "Unlock these Benefits",
    gradientWords: ["Benefits"],
    gradient: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
    benefits: [
      {
        heading: "Improved Decision-Making:",
        description: "Make real-time, data-driven decisions for better patient outcomes.",
      },
      {
        heading: "Predictive Analytics:",
        description: "Anticipate patient needs with precision for proactive care.",
      },
      {
        heading: "Automation:",
        description: "Streamline processes from discharge summaries to prescription digitization.",
      },
    ],
  },
  {
    titleDesktop:
      "Explore how GudMed is <br> transforming healthcare <br> one innovation at a time.",
    titleMobile: "Explore how GudMed is <br>transforming healthcare <br> one innovation at a time.",
    gradientWords: ["GudMed", "transforming", "innovation"],
    gradient: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  },
];

const Slider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const carouselRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth < 768);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        if (!isClicked) {
          carouselRef.current?.slideNext();
        }
      }, 5000); // Change slide every 5 seconds
    };

    startAutoSlide();

    return () => clearInterval(intervalRef.current); // Clear interval on component unmount
  }, [isClicked]);

  // Pause auto sliding when clicking
  const handleClick = () => {
    setIsClicked(true);
    clearInterval(intervalRef.current); // Stop auto sliding
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    intervalRef.current = setInterval(() => {
      if (!isClicked) {
        carouselRef.current?.slideNext();
      }
    }, 5000); // Restart auto sliding
  };

  const handleNext = () => carouselRef.current?.slideNext();
  const handlePrev = () => carouselRef.current?.slidePrev();

  const carouselSettings = {
    autoPlay: false,
    infinite: true,
    disableButtonsControls: true,
    disableDotsControls: true,
    onSlideChanged: (e) => setCurrentSlideIndex(e.item),
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      1024: { items: 1 },
    },
  };

  const renderTitle = (title, gradientWords, gradientClass) => {
    const words = title.split(" ");
    return words.map((word, index) => {
      const isGradientWord = gradientWords.some((gradientWord) =>
        gradientWord.includes(word)
      );
      return (
        <span
          key={index}
          className={isGradientWord ? `text-transparent bg-clip-text ${gradientClass}` : ""}
        >
          {word}{" "}
        </span>
      );
    });
  };

  const renderFormattedTitle = (title, gradientWords, gradientClass) => {
    if (isMobile) {
      // Preserve <br> tags in mobile view
      return title.split(/<br\s*\/?>/).map((chunk, index) => (
        <React.Fragment key={index}>
          {renderTitle(chunk, gradientWords, gradientClass)}
          {index < title.split(/<br\s*\/?>/).length - 1 && <br />}
        </React.Fragment>
      ));
    }

    return title
      .split(/<br\s*\/?>/)
      .map((chunk, index) => (
        <React.Fragment key={index}>
          {renderTitle(chunk, gradientWords, gradientClass)}
          {index < title.split(/<br\s*\/?>/).length - 1 && <br />}
        </React.Fragment>
      ));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div
        className="relative w-full px-6 sm:px-12 lg:px-24 py-4 sm:py-8 flex flex-col items-center sm:mt-6"
        onClick={handleClick}
        onMouseUp={handleMouseUp}
      >
        <div className="relative w-full">
          <AliceCarousel
            ref={carouselRef}
            {...carouselSettings}
            activeIndex={currentSlideIndex}
            items={slides.map((slide, index) => (
              <div key={index} className="text-container animate__animated animate__slideInRight animate__faster">
                <h1
                  className={`text-gray-800 text-center font-bold leading-tight ${slide.titleDesktop.length > 100
                    ? "text-[1.5rem] sm:text-3xl lg:text-[4.6rem] md:text-2rem"
                    : slide.titleDesktop.length > 60
                    ? "mt-10 md:mt-0 text-[1.6rem] sm:text-4xl lg:text-7xl"
                    : "text-5xl sm:text-5xl lg:text-8xl"
                    } ipad-pro:text-[3rem] fold:text-[2rem] ipad-pro:leading-snug fold:leading-snug`}
                >
                  {renderFormattedTitle(
                    isMobile ? slide.titleMobile : slide.titleDesktop,
                    slide.gradientWords,
                    slide.gradient
                  )}
                </h1>
                {slide.benefits && (
                  <ul className="mt-6 space-y-3 mx-auto sm:px-12">
                    {slide.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 text-center"
                      >
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text font-semibold">
                          {benefit.heading}
                        </span>{" "}
                        <span>{benefit.description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          />
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 top-[15rem] md:top-1/2 transform -translate-y-1/2 bg-[#2E4168] w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white hover:bg-customDark shadow-lg flex items-center justify-center transition-all duration-300 z-50"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-[15rem] md:top-1/2 transform -translate-y-1/2 bg-[#2E4168] w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white hover:bg-customDark shadow-lg flex items-center justify-center transition-all duration-300 z-50"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
