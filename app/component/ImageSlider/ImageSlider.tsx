// components/ImageSlider.tsx
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: string[];
  slidesToShow?: number;
  autoplay?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  slidesToShow = 3,
  autoplay = true,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <Image
              src={img}
              alt={`slide-${index}`}
              className="slider-image"
              layout="responsive"
              width={500}
              height={300}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
