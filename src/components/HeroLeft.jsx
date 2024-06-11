import React from "react";

const HeroLeft = ({ bgColor, img, title, desc }) => {
  return (
    <div className={`hero min-h-screen ${bgColor} my-2 py-10`}>
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-evenly">
        <img
          src={img}
          className="max-w-sm rounded-lg shadow-xl w-full"
          alt="Hero Image"
        />
        <div className="px-8 my-8">
          <h1 className="text-3xl lg:text-5xl text-white font-bold text-center lg:text-left">
            {title}
          </h1>
          <p className="py-6 text-center lg:text-left text-gray-100">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroLeft;
