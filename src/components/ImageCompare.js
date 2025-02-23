import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import callBg from '../img/compare image.png';
import englishImage from '../img/Compare Image English.png';
import hindiImage from '../img/compare image Hindi.png';

const ImageSection = ({ title, beforeImage, afterImage }) => (
    <div className="w-full md:w-1/2 p-4 rounded-lg shadow-lg bg-white">
        <h2 className="text-center text-xl md:text-2xl font-semibold mb-4 text-" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h2>
        <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={afterImage} alt="After" />}
            itemTwo={<ReactCompareSliderImage src={beforeImage} alt="Before" />}
            portrait={false}
            boundsPadding={0}
            position={50}
            changePositionOnHover={false}
            onlyHandleDraggable={false}
        />
    </div>
);

const ImageComparison = () => {
    return (
        <div className="container mx-auto p-6 lg:p-12  bg-white rounded-lg shadow-md">
            <h1 className=" text-center text-4xl md:text-4xl mt-0 mb-4 text-[#2E4168] font-semibold">
                Sample Prescription
            </h1>
            <p className="text-center mb-6 text-lg md:text-2xl text-gray-700 font-medium font-sans">
                <span className="text-[#2E4168] font-semibold">Move the slider</span> left and right to see the magic!
            </p>

            <div className="flex flex-col text-3xl  md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-10  text-[#2E4168]">
                <ImageSection title="In English" beforeImage={callBg}  afterImage={englishImage} />
                <ImageSection title="हिन्दी में"   beforeImage={callBg} afterImage={hindiImage} />
            </div>
        </div>
    );
};

export default ImageComparison;
