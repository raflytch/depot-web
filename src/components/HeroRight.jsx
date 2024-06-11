import React from "react";

const HeroRight = ({ img, title, desc }) => {
  return (
    <div className="hero min-h-screen bg-white my-5">
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-evenly">
        <img src={img} className="max-w-sm rounded-lg w-full" />
        <div className="px-8 my-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-center lg:text-left text-primary">
            {title}
          </h1>
          <p className="py-6 text-center lg:text-left">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroRight;
